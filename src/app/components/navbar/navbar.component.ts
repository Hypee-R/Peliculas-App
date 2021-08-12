import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  buscarPelicula(txtBuscar: string){
    txtBuscar = txtBuscar.trim();
    if(txtBuscar.length === 0) return;
    console.log(txtBuscar);

    this.router.navigate(['/search', txtBuscar]);
  }

}
