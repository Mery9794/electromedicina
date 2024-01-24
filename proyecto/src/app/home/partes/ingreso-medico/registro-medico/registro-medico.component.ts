import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../servicios/auth.service/auth.service'; 

@Component({
  selector: 'app-registro-medico',
  standalone: true,
  imports: [],
  templateUrl: './registro-medico.component.html',
  styleUrl: './registro-medico.component.css'
})
export class RegistroMedicoComponent implements OnInit {
  registroForm: FormGroup;
  parteVisible: string = 'datosGenerales'; // Inicialmente mostramos la primera parte
  registroExitoso: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private db: AngularFireDatabase
  ) {
    this.registroForm = this.formBuilder.group({
      // Campos para Datos Generales
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      edad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],

      // Campos para Contacto
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],

      // Campos para Contraseña
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      perfil:'profesional',
    });
  }

 
  ngOnInit(): void {}

  mostrarParte(parte: string) {
    this.parteVisible = parte;
  }

  mostrarParteAnterior() {
    if (this.parteVisible === 'contacto') {
      this.parteVisible = 'datosGenerales';
    } else if (this.parteVisible === 'contrasena') {
      this.parteVisible = 'contacto';
    }
  }

  mostrarParteSiguiente() {
    if (this.parteVisible === 'datosGenerales') {
      this.parteVisible = 'contacto';
    } else if (this.parteVisible === 'contacto') {
      this.parteVisible = 'contrasena';
    }
  }

  async registrarProfesional() {
    console.log('Registrando profesional...');
    if (this.registroForm.valid) {
      const profesionalData = this.registroForm.value;

      // Agregar el código para guardar los datos en Firebase Realtime Database
      const newProfesionalRef = this.db.list('profesionales').push(profesionalData);

      // Reiniciar el formulario después del registro
      this.registroForm.reset();
      this.parteVisible = 'datosGenerales'; // Volver a la primera parte
      // Marcar el registro como exitoso y mostrar el mensaje
      this.registroExitoso = true;

    }
     // Agregar el código para guardar los datos en Firebase Database
     console.log(this.registroForm.value)
     const response = await this.authService.addUser2(this.registroForm.value);
     console.log(response);
   }
}

