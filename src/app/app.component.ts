import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'electromedicina';
  esPaginaPaciente: boolean = false;
    esPaginaRegistroPaciente: boolean = false;
    esPaginaMedico: boolean = false;
    esPaginaRegistroMedico: boolean = false;
    esPaginaAdmin: boolean = false;
    esPaginaHistorial: boolean = false;
    esPaginaSignosVitales: boolean = false;
  
    constructor(private router: Router) {
      // Detectar cuando la ruta cambia para determinar si estás en la página de pacientes, medicos o registros
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.esPaginaPaciente = event.url.includes('/pagina-del-paciente'); 
          this.esPaginaRegistroPaciente = event.url.includes('/registro-paciente'); 
          this.esPaginaMedico = event.url.includes('/pagina-medico'); 
          this.esPaginaRegistroMedico = event.url.includes('/registro-medico'); 
          this.esPaginaAdmin = event.url.includes('/pagina-admin'); 
          this.esPaginaHistorial = event.url.includes('/historial-clinico/'); // Modificar aquí para que incluya cualquier URL relacionada con historial-clínico
          this.esPaginaSignosVitales = event.url.includes('/signos-vitales/'); // Modificar aquí para que incluya cualquier URL relacionada con historial-clínico
        }
      });
    } 
  }