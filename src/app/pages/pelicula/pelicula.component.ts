import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { CreditsResponse, Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';
import { WatchResponse } from '../../interfaces/watch-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  movieDetalle: MovieDetails;
  movieCast: Cast[] = [];
  movieWatchProviders: WatchResponse;
  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    //Ejecuta observables y retorna el valor cuando todas
    //las peticiones se han realizado y efectuado por lo menos un valor
    combineLatest([
      this.peliculasService.getDetallePelicula(id),
      this.peliculasService.getCastPelicula(id),
      this.peliculasService.getWatchMovie(id),
    ])
    .subscribe( ( [pelicula, cast, watch] ) =>{

      if(!pelicula) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.movieDetalle = pelicula;
      this.movieCast = cast.filter(x => x.profile_path);
      this.movieWatchProviders = watch;
    });


    // this.peliculasService.getDetallePelicula(id).subscribe(movie => {
    //   if(!movie) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.movieDetalle = movie;
    // });

    // this.peliculasService.getCastPelicula(id).subscribe(cast => this.movieCast = cast.filter(x => x.profile_path));
  }

  regresar(){
    this.location.back();
  }

}
