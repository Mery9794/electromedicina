import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  botonActivo: string | null = null; // Inicialmente, el botón 'Inicio' está activo
  menuOpen = false;

  cambiarBotonActivo(boton: string) {
    if (this.botonActivo === boton) {
      this.botonActivo = null; // Si el botón seleccionado ya está activo, desactivarlo
    } else {
      this.botonActivo = boton;
    }
  }
}