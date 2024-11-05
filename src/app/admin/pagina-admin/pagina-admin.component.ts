import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SharedService } from '../../servicios/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagina-admin',
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.css'


})
export class PaginaAdminComponent implements OnInit, OnDestroy {
  botonActivo: string = 'Inicio';
  pestanasVisible: any = {
    Inicio: true,
    Medicos: false,
    Perfil: false,
    Agendas: false,
    Informes: false,
    Administradores: false,
    GruposMedicos: false,
  };

  usuario = { nombre: '', apellido: '' };
  saludo: string = '';
  pacientesFavoritos: any[] = [];
  mobileMenuOpen = false;
  userMenuVisible = false;

  private authSubscription: Subscription | undefined;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.saludo = this.obtenerSaludo();
  }

// Obtiene el NOMBRE Y APELLIDO del profesional segun el ID en FIRESTORE DATABASE
ngOnInit() {
   
  this.firebaseAuth.authState.subscribe((auth) => {
    if (auth) {
      // Usuario autenticado, obtén su ID de usuario
      const userId = auth.uid; 
      console.log('ID del profesional:', userId);
      // Consulta la base de datos para obtener los datos del profesional
      this.authService.getProfesionalData(userId).subscribe((profesional: any) => {
        console.log('Datos del profesional:', profesional);
        if (profesional) {
         this.sharedService.actualizarDatosProfesional(profesional.nombre, profesional.apellido);
          console.log('apellido:', profesional.apellido);
          console.log('nombre:', profesional.nombre);
          this.usuario.apellido = profesional.apellido;
          this.usuario.nombre = profesional.nombre;
        }
      });
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
    } else {
      saludo = 'Buenas Noches';
    }
    return saludo;
  }


  toggleUserMenu() {
    this.userMenuVisible = !this.userMenuVisible;
  }

  cambiarPestana(pestana: string): void {
    this.botonActivo = pestana;

    for (const key in this.pestanasVisible) {
      if (key === pestana) {
        this.pestanasVisible[key] = true;
      } else {
        this.pestanasVisible[key] = false;
      }
    }

    this.mobileMenuOpen = false; // Cerrar menú en dispositivos móviles al cambiar de pestaña
  }

  cerrarSesion(): void {
    this.router.navigate(['/inicio']);
  }

  obtenerPacientesFavoritos(): void {
    this.db.list('/pacientes').valueChanges().subscribe(
      (data: any) => {
        this.pacientesFavoritos = data;
      },
      (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
  }
}