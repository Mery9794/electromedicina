import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Metrica, UserPaciente, UserProfesional } from '../models';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  async getUltimaMetrica(idPaciente: number): Promise<Metrica | null> {
    try {
      const metricasCollection = collection(this.firestore, 'Metricas');
      const metricaQuerySnapshot = await getDocs(query(metricasCollection, where('idPaciente', '==', idPaciente)));
      const metricas = metricaQuerySnapshot.docs.map(doc => doc.data() as Metrica);
      return metricas.length > 0 ? metricas[metricas.length - 1] : null;
    } catch (error) {
      console.error('Error al obtener la última métrica:', error);
      return null;
    }
  }

  getAllPacientes(idProfesional: number): Observable<UserPaciente[]> {
    const userRef = collection(this.firestore, 'Usuario: Pacientes');
    const queryRef = query(userRef, where('idProfesional', '==', idProfesional));
    return from(getDocs(queryRef)).pipe(
      map((querySnapshot) => {
        const pacientes: UserPaciente[] = [];
        querySnapshot.forEach((doc) => {
          pacientes.push(doc.data() as UserPaciente);
        });
        return pacientes;
      })
    );
  }

  getAllProfesionales(): Observable<UserProfesional[]> {
    const userRef = collection(this.firestore, 'Usuario: Profesionales');
    return from(getDocs(userRef)).pipe(
      map((querySnapshot) => {
        const medicos: UserProfesional[] = [];
        querySnapshot.forEach((doc) => {
          medicos.push(doc.data() as UserProfesional);
        });
        return medicos;
      })
    );
  }
}
