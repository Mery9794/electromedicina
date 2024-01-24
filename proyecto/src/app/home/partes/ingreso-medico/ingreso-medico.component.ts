import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth


@Component({
  selector: 'app-ingreso-medico',
  standalone: true,
  imports: [],
  templateUrl: './ingreso-medico.component.html',
  styleUrl: './ingreso-medico.component.css'
})
export class IngresoMedicoComponent implements OnInit {
  mostrarFormularioMedico = true; // Mostrar o ocultar el formulario
  formularioMedico: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth // Injecta AngularFireAuth
  ) {
    this.formularioMedico = this.formBuilder.group({
      email: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async ingresarMedico() {
    const email = this.formularioMedico.value.email;
    const contrasena = this.formularioMedico.value.contrasena;

    try { 
      const resultado = await this.auth.signInWithEmailAndPassword(email, contrasena);
      if (resultado.user) {
        this.router.navigate(['/pagina-medico']);
      }

    } catch (error) {
      console.log('Error en el inicio de sesión:', error);
    }
  }


  ingresarPrimeraVez() {
    // Método para abrir el formulario de registro en una nueva ventana

    const nuevaVentana = window.open('/registro-medico', '_blank', 'height=600,width=800');
    if (nuevaVentana) {
      nuevaVentana.focus();
    } else {
      // Manejar el caso en el que no se pudo abrir una nueva ventana (por bloqueo de ventanas emergentes)
      alert('No se pudo abrir una nueva ventana. Asegúrate de deshabilitar el bloqueo de ventanas emergentes.');
    }
  }
}