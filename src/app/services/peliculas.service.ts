import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { catchError, map, tap } from 'rxjs/operators'
import { MovieDetails } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { WatchResponse } from '../interfaces/watch-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  baseUrl = 'https://api.themoviedb.org/3';
  carteleraPage = 1;
  public loading: boolean = false;
  constructor(
    private http: HttpClient,
  ) {}

  get params(){
    return {
      api_key: '4e9c551e15c75ec911b5bd6c452015cf',
      language: 'es-ES',
      page: this.carteleraPage
    }
  }

  getCartelera(): Observable<Movie[]> {

    if(this.loading) return of([]);

    this.loading = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{ params: this.params })
              .pipe(
                map(resp => resp.results),
                tap( () => {//Dispara es un operador que dispara un efecto secundario cada que el observable emita un valor
                  this.carteleraPage += 1;
                  this.loading = false;
                })
              );
  }

  buscarPeliculas(texto: string): Observable<Movie[]>{
    const paramsSearch ={
      ...this.params,
      page: 1,
      query: texto,
      include_adult: true
    }
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, { params: paramsSearch })
            .pipe(
              map(resp => resp.results)
            );
  }

  getDetallePelicula(id: number): Observable<MovieDetails>{
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, { params: this.params})
                  .pipe(
                    catchError(err => of(null))
                  );
  }

  getCastPelicula(id: number): Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, { params: this.params})
                .pipe(
                  map(resp => resp.cast),
                  catchError(err => of(null))
                );
  }

  getWatchMovie(id: number): Observable<WatchResponse>{
    return this.http.get<WatchResponse>(`${this.baseUrl}/movie/${id}/watch/providers`, { params: this.params })
                .pipe(
                  map(resp => resp),
                  catchError(err => of(null))
                );
  }

}
