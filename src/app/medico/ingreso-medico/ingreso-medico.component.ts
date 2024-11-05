import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth

@Component({
  selector: 'app-ingreso-medico',
  templateUrl: './ingreso-medico.component.html',
  styleUrl: './ingreso-medico.component.css'
})
export class IngresoMedicoComponent implements OnInit {
  mostrarFormularioMedico = true;
  formularioMedico: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth
  ) {
    this.formularioMedico = this.formBuilder.group({
      email: ['', Validators.required],
      contrasena: ['', Validators.required],
      tipoUsuario: ['', Validators.required] // Agregar un campo para el tipo de usuario
    });
  }

  ngOnInit(): void {
  }

  async ingresarMedico() {
    const email = this.formularioMedico.value.email;
    const contrasena = this.formularioMedico.value.contrasena;
    const perfil = this.formularioMedico.value.perfil;
  
    try {
      const resultado = await this.auth.signInWithEmailAndPassword(email, contrasena);
  
      if (resultado.user) {
  
        if (email === 'sol9794@gmail.com') {
          this.router.navigate(['/pagina-admin']);
        } else {
          this.router.navigate(['/pagina-medico']);
        }
      }
    } catch (error) {
      console.log('Error en el inicio de sesión:', error);
    }
  }
   
  ingresarPrimeraVez() {
    const nuevaVentana = window.open('/registro-medico', '_blank', 'height=600,width=800');
    if (nuevaVentana) {
      nuevaVentana.focus();
    } else {
      alert('No se pudo abrir una nueva ventana. Asegúrate de deshabilitar el bloqueo de ventanas emergentes.');
    }
  }
}