import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { UserI } from '../../models/models'; 

const db = getFirestore();
const auth = getAuth();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private contador = new BehaviorSubject<number>(0);
  contadorObservable = this.contador.asObservable();

  constructor(private firestore: Firestore, private auth: AngularFireAuth, private db: AngularFireDatabase) { }

  addUser(user: UserI) {
    const userRef = collection(this.firestore, 'Usuario: Pacientes');
    return addDoc(userRef, user);
  }
  
  addUser2(user: UserI) {
    const userRef = collection(this.firestore, 'Usuario: Profesionales');
    return addDoc(userRef, user);
  }

// Obtiene el NOMBRE Y APELLIDO del profesional en FIRESTORE DATABASE
  getProfesionalData(userId: string): Observable<any> {
    const userRef = doc(this.firestore, 'Usuario: Profesionales', userId);
    return from(getDoc(userRef)).pipe(
        map((doc: { exists: () => any; data: () => any; }) => {
            if (doc.exists()) {
                const data = doc.data();
                return {
                    apellido: data.apellido,
                    nombre: data.nombre
                };
            } else {
                return null;
            }
        })
    );
}

incrementarContador() {
  this.contador.next(this.contador.value + 1);
}
}