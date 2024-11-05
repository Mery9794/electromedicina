import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth
import { FirebaseService } from '../../firebase/firebase.service';


@Component({
  selector: 'app-ingreso-paciente',
  templateUrl: './ingreso-paciente.component.html',
  styleUrl: './ingreso-paciente.component.css'
})
export class IngresoPacienteComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  constructor(private firebaseService: FirebaseService, private auth: AngularFireAuth, private router: Router) {
    // Ahora puedes acceder a Firebase a través de firebaseService
  }

  // Define funciones para manejar eventos aquí
  ingresarPaciente() {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // Ingreso exitoso, redirigir a la página de pacientes
        this.router.navigate(['/pagina-del-paciente']);
      })
      .catch((error) => {
        this.error = error.message;
      });
  }


  mostrarModalContacto = false;

  mostrarContacto(ocultar: boolean) {
    this.mostrarModalContacto = ocultar;
    console.log('mostrarContacto() llamada');
  }
}