import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  botonActivo: string = 'inicio'; // Inicialmente, el botón 'Inicio' está activo
  cambiarBotonActivo(boton: string) {
    this.botonActivo = boton;
  }
}