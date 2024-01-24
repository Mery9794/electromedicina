import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-del-paciente',
  standalone: true,
  imports: [],
  templateUrl: './pagina-del-paciente.component.html',
  styleUrl: './pagina-del-paciente.component.css'
})
export class PaginaDelPacienteComponent {
  contenidoVisible: string = 'inicioPaciente'; // Inicialmente muestra la pestaña 'Inicio'
  titulo: string = 'Bienvenido'; // Título inicial
  saludo: string = '';

  constructor(private router: Router) {
    this.setSaludo();
   }

  mostrarContenido(seleccion: string): void {
    this.contenidoVisible = seleccion;

    // Cambiar el título según la pestaña seleccionada
    switch (seleccion) {
      case 'inicioPaciente':
        this.titulo = 'Bienvenido';
        break;
      case 'vivo':
        this.titulo = 'Vivo';
        break;
      case 'notas':
        this.titulo = 'Notas';
        break;
      case 'ecg':
        this.titulo = 'Ecg';
        break;
      case 'historial':
        this.titulo = 'Historial';
        break;
    }
  }
  cerrarSesion() {
    // Agrega aquí la lógica de cierre de sesión, como limpiar el token o eliminar la información de sesión.
    // Luego, navega a la página principal.
    this.router.navigate(['/inicio']);
  }
  setSaludo() {
    const hora = new Date().getHours();
    if (hora >= 4 && hora < 12) {
      this.saludo = 'Buenos días';
    } else if (hora >= 12 && hora < 19) {
      this.saludo = 'Buenas tardes';
    } else if (hora >= 19 ||hora<4){
      this.saludo = 'Buenas noches';
    }
  }
}