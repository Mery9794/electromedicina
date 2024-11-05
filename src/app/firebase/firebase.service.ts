import { Injectable } from '@angular/core';
import { environment } from './firebase-config/firebase-config.module';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {
    // Inicializa Firebase con la configuración importada
    const app = initializeApp(environment.firebaseConfig);

    // Verifica si Firebase Analytics es compatible y si estamos en el entorno del cliente
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          // Inicializa Firebase Analytics si es compatible
          const analytics = getAnalytics(app);
        } else {
          console.warn('Firebase Analytics no es compatible en este entorno.');
        }
      }).catch((error) => {
        console.error('Error al verificar la compatibilidad con Firebase Analytics:', error);
      });
    } else {
      console.warn('Firebase Analytics no se inicializa en el entorno del servidor.');
    }
  }

  // Agrega métodos y lógica para interactuar con Firebase en este servicio
}
