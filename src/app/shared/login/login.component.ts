import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importa el servicio AngularFireDatabase


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = ''; // Declaración e inicialización de userName como string vacío
  password: string = ''; // Declaración e inicialización de password como string vacío


  constructor(private router: Router, private db: AngularFireDatabase) {} // Usa AngularFireDatabase en lugar de AngularFireDatabaseModule


}