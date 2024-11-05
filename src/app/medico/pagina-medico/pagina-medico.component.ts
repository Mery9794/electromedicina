import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SharedService } from '../../servicios/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagina-medico',
  templateUrl: './pagina-medico.component.html',
  styleUrls: ['./pagina-medico.component.css'],
  host: { 'attr': 'unique-id-pagina-medico' }  // Agrega un atributo host único
})
export class PaginaMedicoComponent implements OnInit, OnDestroy {
  botonActivo: string = 'inicio';
  private authSubscription: Subscription | undefined;
  pestanasVisible: any = {
    Inicio: true,
    Favoritos: false,
    Mapeo: false,
    Registro: false
  };

  usuario = { nombre: '', apellido: '' };
  saludo: string = '';
  searchTerm: string = '';
  pacientesFavoritos: any[] = [];

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.saludo = this.obtenerSaludo();
  }

  ngOnInit() {
    this.authSubscription = this.firebaseAuth.authState.subscribe((auth) => {
      if (auth && auth.email) { // Verificamos que haya un usuario autenticado y un correo electrónico
        const userEmail = auth.email;
        console.log('Correo electrónico del usuario:', userEmail);

        // Obtener el ID del médico según el correo electrónico
        this.authService.getProfesionalIdByEmail(userEmail).subscribe((profesionalId: any) => {
          console.log('ID del profesional:', profesionalId);
          if (profesionalId) {
            // Obtener los datos del médico usando su ID
            this.authService.getProfesionalData(profesionalId).subscribe((profesional: any) => {
              console.log('Datos del profesional:', profesional);
              if (profesional) {
                this.sharedService.actualizarDatosProfesional(profesional.nombre, profesional.apellido);
                this.usuario.apellido = profesional.apellido;
                this.usuario.nombre = profesional.nombre;
              }
            });
          }
        });
      } else {
        console.log('No hay usuario autenticado o falta el correo electrónico.');
      }
    });

    this.obtenerPacientesFavoritos();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  obtenerSaludo(): string {
    const hoy = new Date();
    const hora = hoy.getHours();
    let saludo = '';

    if (hora >= 4 && hora < 12) {
      saludo = 'Buenos Días';
    } else if (hora >= 12 && hora < 19) {
      saludo = 'Buenas Tardes';
    } else if (hora >= 19 || hora < 4) {
      saludo = 'Buenas Noches';
    }
    return saludo;
  }

  cambiarPestana(pestana: string): void {
    for (const key in this.pestanasVisible) {
      if (key === pestana) {
        this.pestanasVisible[key] = true;
      } else {
        this.pestanasVisible[key] = false;
      }
    }
  }

  cerrarSesion(): void {
    this.router.navigate(['/inicio']);
  }

  obtenerPacientesFavoritos(): void {
    this.db.list('/pacientes').valueChanges().subscribe(
      (data: any) => {
        this.pacientesFavoritos = data.map((paciente: any) => ({
          idPaciente: paciente.idPaciente,
          nombre: paciente.nombre,
          apellido: paciente.apellido,
          // ... otros campos según el modelo actualizado
        }));

        console.log('Pacientes obtenidos:', this.pacientesFavoritos);
      },
      (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
  }

  abrirFormularioRegistro() {
    const nuevaVentana = window.open('/registro-paciente', '_blank', 'height=600,width=800');
    if (nuevaVentana) {
      nuevaVentana.focus();
    } else {
      alert('No se pudo abrir una nueva ventana. Asegúrate de deshabilitar el bloqueo de ventanas emergentes.');
    }
  }
}
