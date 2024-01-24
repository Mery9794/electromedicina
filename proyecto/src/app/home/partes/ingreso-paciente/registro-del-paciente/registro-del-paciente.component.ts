import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../servicios/auth.service/auth.service';

@Component({
  selector: 'app-registro-del-paciente',
  standalone: true,
  imports: [],
  templateUrl: './registro-del-paciente.component.html',
  styleUrl: './registro-del-paciente.component.css'
})
export class RegistroDelPacienteComponent implements OnInit {
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
      perfil: 'paciente',
    });
  }


  ngOnInit(): void { }

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


  async registrarPaciente() {
    console.log('Registrando paciente...');
    if (this.registroForm.valid) {
      const pacienteData = this.registroForm.value;

      // Agregar el código para guardar los datos en Firebase Realtime Database
      const newPacienteRef = this.db.list('pacientes').push(pacienteData);

      // Reiniciar el formulario después del registro
      this.registroForm.reset();
      this.parteVisible = 'datosGenerales'; // Volver a la primera parte
      // Marcar el registro como exitoso y mostrar el mensaje
      this.registroExitoso = true;

    }
    // Agregar el código para guardar los datos en Firebase Database
    console.log(this.registroForm.value)
    const response = await this.authService.addUser(this.registroForm.value);
    console.log(response);
  }
}


