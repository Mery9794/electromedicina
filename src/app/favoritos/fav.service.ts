import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Metrica, UserPaciente, UserProfesional } from '../models';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  // Obtener la última métrica de un paciente
  async getUltimaMetrica(idPaciente: number): Promise<Metrica | null> {
    try {
      const metricasCollection = collection(this.afs.firestore, 'Metricas');
      const metricaQuerySnapshot = await getDocs(query(metricasCollection, where('idPaciente', '==', idPaciente)));
      const metricas = metricaQuerySnapshot.docs.map(doc => doc.data() as Metrica);
      return metricas.length > 0 ? metricas[metricas.length - 1] : null;
    } catch (error) {
      console.error('Error al obtener la última métrica:', error);
      return null;
    }
  }

  // Obtiene todos los pacientes desde la colección 'Usuario: Pacientes' en Firebase.
  getAllPacientes(idProfesional: number): Observable<UserPaciente[]> {
    const userRef = collection(this.afs.firestore, 'Usuario: Pacientes');
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

  // PARA EL HISTORIAL CLINICO
  getPacienteById(id: number): Observable<UserPaciente | undefined> {
    return this.afs.collection<UserPaciente>('Usuario: Pacientes').doc(`${id}`).valueChanges();
  }

  getHistorialClinico(idPaciente: number): Observable<Metrica[]> {
    return this.afs.collection<Metrica>('Metricas', ref => ref.where('idPaciente', '==', idPaciente).orderBy('fecha')).valueChanges().pipe(
      map((metricas: Metrica[]) => {
        return metricas.map((doc: Metrica) => {
          return { id: doc.idMetrica, ...doc };
        });
      })
    );
  }

  actualizarPaciente(paciente: UserPaciente): Promise<void> {
    return this.afs.collection<UserPaciente>('Usuario: Pacientes').doc(`${paciente.idPaciente}`).update(paciente);
  }

  actualizarMetrica(metrica: Metrica): Promise<void> {
    const metricaRef = this.afs.collection<Metrica>('Metricas').doc(metrica.idMetrica.toString());
    return metricaRef.update(metrica);
  }

  // Obtiene todos los profesionales desde la colección 'Usuario: Profesionales' en Firebase.
  getAllProfesionales(): Observable<UserProfesional[]> {
    const userRef = collection(this.afs.firestore, 'Usuario: Profesionales');
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

  // Obtiene el total de médicos desde la colección 'Usuario: Profesionales' en Firebase.
  getTotalMedicos(): Observable<number> {
    return this.afs.collection('Usuario: Profesionales').valueChanges().pipe(
      map((medicos: any[]) => medicos.length)
    );
  }

  // Da de baja un profesional, actualizando su estado y registrando el motivo.
  darDeBajaProfesional(medico: UserProfesional): void {
    this.db.object(`profesionales/${medico.idProfesional}`).update({ estado: 'inactivo' });
    this.db.list('registrosBajas').push({
      medicoId: medico.idProfesional,
      motivo: 'Sin motivo',
      fecha: new Date().toISOString()
    });
  }
}

