import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  peliculaSearch: string;
  resultadosSearch: Movie[] = [];
  constructor(
    private activatedRoutes: ActivatedRoute,
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {

    this.activatedRoutes.params.subscribe(params => {
      this.peliculaSearch = params.texto;
      this.peliculasService.buscarPeliculas(this.peliculaSearch).subscribe(movies => {
        this.resultadosSearch = movies;
      });
    });

  }

}
