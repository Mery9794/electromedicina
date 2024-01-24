import { Injectable } from '@angular/core';
import { environment } from './firebase-config/firebase-config.module';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {
    // Inicializa Firebase con la configuración importada
    const app = initializeApp(environment.firebaseConfig);

    // Inicializa servicios adicionales de Firebase si los necesitas, como Firebase Analytics
    const analytics = getAnalytics(app);
  }

  // Agrega métodos y lógica para interactuar con Firebase en este servicio
}