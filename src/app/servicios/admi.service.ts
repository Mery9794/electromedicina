import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserPaciente, UserProfesional } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdmiService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  private adminInfoPath = 'Usuario: Profesionales';

  getCurrentUserId(): Observable<string | null> {
    return this.auth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }

  getUserById(userId: string): Observable<UserProfesional | null> {
    if (!userId) {
      return of(null);
    }

    const userRef = this.firestore.collection('Usuario: Profesionales').doc(userId);

    return userRef.valueChanges().pipe(
      map((userData: any) => userData as UserProfesional),
      catchError(error => {
        console.error('Error obteniendo datos del usuario:', error);
        return of(null);
      })
    );
  }

  getCurrentUser(): Observable<UserProfesional| null> {
    return this.getCurrentUserId().pipe(
      switchMap((userId) => userId ? this.getUserById(userId) : of(null))
    );
  }
}
