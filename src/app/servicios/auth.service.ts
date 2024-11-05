import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Atiende, Metrica, ProfesionalData } from '../models';
import { collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  getProfesionalData(uid: string): Observable<ProfesionalData | null> {
    const userRef = this.afs.doc(`Usuario: Profesionales/${uid}`).get();
    return from(userRef).pipe(
      map(snapshot => {
        if (snapshot.exists) {
          return snapshot.data() as ProfesionalData;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Error al obtener datos del profesional:', error);
        return of(null);
      })
    );
  }
  

  getUserProfesionalId(): Observable<number | null> {
    return this.auth.user.pipe(
      switchMap(user => {
        if (user) {
          return this.getProfesionalIdByEmail(user.email);
        } else {
          return of(null);
        }
      }),
      catchError(error => {
        console.error('No se pudo obtener el ID del profesional:', error);
        return of(null);
      })
    );
  }

  getProfesionalIdByEmail(email: string | null): Observable<number> {
    if (!email) {
      console.error('El correo electrónico proporcionado es nulo o no válido.');
      return throwError(() => new Error('El correo electrónico proporcionado es nulo o no válido.'));
    }

    return this.afs.collection('Usuario: Profesionales', ref => ref.where('email', '==', email))
      .valueChanges({ idField: 'idProfesional' })
      .pipe(
        map(profesionales => {
          console.log('Profesionales encontrados:', profesionales);
          if (profesionales.length > 0) {
            const idProfesional = profesionales[0].idProfesional;
            console.log('ID Profesional encontrado:', idProfesional);
            return parseInt(idProfesional, 10);
          } else {
            console.error('No se encontró ningún profesional con el correo electrónico proporcionado.');
            return -1;
          }
        }),
        catchError(error => {
          console.error('Error al obtener ID del profesional por correo electrónico:', error);
          return throwError(() => new Error('Error al obtener ID del profesional por correo electrónico'));
        })
      );
  }

  async vicuPacienteMedico(favorito: Atiende): Promise<void> {
    try {
      const favoritosRef = collection(this.afs.firestore, 'Favoritos');
      await addDoc(favoritosRef, favorito);
      console.log('Favorito agregado exitosamente:', favorito);
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      throw error;
    }
  }

  async addMetrica(metrica: Metrica): Promise<void> {
    try {
      const metricasRef = collection(this.afs.firestore, 'Metricas');
      await addDoc(metricasRef, metrica);
      console.log('Métrica agregada exitosamente:', metrica);
    } catch (error) {
      console.error('Error al agregar métrica:', error);
      throw error;
    }
  }

  
}
