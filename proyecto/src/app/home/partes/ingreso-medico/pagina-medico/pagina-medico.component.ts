import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../../../servicios/auth.service/auth.service'; 

@Component({
  selector: 'app-pagina-medico',
  standalone: true,
  imports: [],
  templateUrl: './pagina-medico.component.html',
  styleUrl: './pagina-medico.component.css'
})
export class PaginaMedicoComponent implements OnInit {
  // Inicialmente, el botón 'Inicio' está activo
 botonActivo: string = 'inicio';
 cambiarBotonActivo(boton: string) {
   this.botonActivo = boton;
 }
//Pestaña visible de INICIO, FAVORITO, MAPA
 pestanasVisible: any = {
   Inicio: true,
   Favoritos: false,
   Mapeo:false
 };

 usuario = { nombre: '', apellido: '' };
 saludo: string = '';
 searchTerm: string = '';
 pacientesFavoritos: any[] = []; // Lista de pacientes favoritos
 constructor(
   private db: AngularFireDatabase,
   private router: Router,
   private firebaseAuth: AngularFireAuth,
   private firebaseDatabase: AngularFireDatabase,
   private authService: AuthService 
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
           this.usuario.apellido = profesional.apellido;
           console.log('apellido:', profesional.apellido);
           this.usuario.nombre = profesional.nombre;
           console.log('nombre:', profesional.nombre);
         }
       });
     }
   });
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

 abrirInfo(): void {
   const infoElement = document.getElementById('info');
   if (infoElement) {
     infoElement.style.display = 'block';
   }
 }

 cerrarInfo(): void {
   const infoElement = document.getElementById('info');
   if (infoElement) {
     infoElement.style.display = 'none';
   }
 }

 cerrarSesion(): void {
   this.router.navigate(['/inicio']);
 }

 buscar() {
   // Si el campo de búsqueda está vacío, muestra todos los pacientes nuevamente
   if (!this.searchTerm) {
     this.pacientesFavoritos = this.obtenerPacientesFavoritos();
     return;
   }

   // Filtra la lista de pacientes según el término de búsqueda
   this.pacientesFavoritos = this.pacientesFavoritos.filter(paciente =>
     paciente.nombre.includes(this.searchTerm) || paciente.apellido.includes(this.searchTerm)
   );
 }
 obtenerPacientesFavoritos(): any[] {

   return [
     this.db.list('/pacientes').valueChanges().subscribe(data => {
       this.pacientesFavoritos = data;
     })
   ];
 }
} 
