import { Component} from '@angular/core';
import { FirebaseService } from 'src/app/firebaseconf/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso-paciente',
  standalone: true,
  imports: [],
  templateUrl: './ingreso-paciente.component.html',
  styleUrl: './ingreso-paciente.component.css'
})
export class IngresoPacienteComponent  {
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

  // Método para abrir el formulario de registro en una nueva ventana
  abrirFormularioRegistro() {
    const nuevaVentana = window.open('/registro-paciente', '_blank', 'height=600,width=800');
    if (nuevaVentana) {
      nuevaVentana.focus();
    } else {
      // Manejar el caso en el que no se pudo abrir una nueva ventana (por bloqueo de ventanas emergentes)
      alert('No se pudo abrir una nueva ventana. Asegúrate de deshabilitar el bloqueo de ventanas emergentes.');
    }
  }

  mostrarModalContacto = false;

  mostrarContacto(ocultar: boolean) {
    this.mostrarModalContacto = ocultar;
    console.log('mostrarContacto() llamada');
  }
}



