import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto';esPaginaPaciente: boolean = false;
  esPaginaRegistroPaciente: boolean = false;
  esPaginaMedico: boolean = false;
  esPaginaRegistroMedico: boolean = false;

  constructor(private router: Router) {
    // Detectar cuando la ruta cambia para determinar si estás en la página de pacientes, medicos o registros
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.esPaginaPaciente = event.url.includes('/pagina-del-paciente'); 
        this.esPaginaRegistroPaciente = event.url.includes('/registro-paciente'); 
        this.esPaginaMedico = event.url.includes('/pagina-medico'); 
        this.esPaginaRegistroMedico = event.url.includes('/registro-medico'); 
      }
    });
  } 
}
