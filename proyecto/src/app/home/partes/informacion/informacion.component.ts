import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/firebaseconf/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {
  constructor(private firebaseService: FirebaseService, private router: Router) {
    // Ahora puedes acceder a Firebase a través de firebaseService
  }


}