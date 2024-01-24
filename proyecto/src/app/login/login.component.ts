import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importa el servicio AngularFireDatabase


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = ''; // Declaración e inicialización de userName como string vacío
  password: string = ''; // Declaración e inicialización de password como string vacío


  constructor(private router: Router, private db: AngularFireDatabase) {} // Usa AngularFireDatabase en lugar de AngularFireDatabaseModule

  onLogin() {
    // Verificar si el usuario es un médico
    const medicosRef = this.db.database.ref("DatosProfesionales");
    medicosRef
      .orderByChild("Usuario")
      .equalTo(this.userName)
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            const medico = childSnapshot.val();
            if (medico.Contraseña === this.password) {
              // Iniciar sesión como médico y redirigir
              this.router.navigate(['/homeProfesional']);
            } else {
              alert("Contraseña incorrecta.");
            }
          });
        } else {
          // El usuario no es un médico, asumimos que es un paciente y redirigimos
          this.router.navigate(['/homePaciente']);
        }
      });
  }

  onRegister() {
    // Redirigir a la página de registro
    this.router.navigate(['/registro']);
  }
}