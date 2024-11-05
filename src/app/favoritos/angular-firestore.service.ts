import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Metrica, UserPaciente, UserProfesional } from '../models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularFirestoreService {
  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

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

  getTotalMedicos(): Observable<number> {
    return this.afs.collection('Usuario: Profesionales').valueChanges().pipe(
      map((medicos: any[]) => medicos.length)
    );
  }

  darDeBajaProfesional(medico: UserProfesional): void {
    this.db.object(`profesionales/${medico.idProfesional}`).update({ estado: 'inactivo' });
    this.db.list('registrosBajas').push({
      medicoId: medico.idProfesional,
      motivo: 'Sin motivo',
      fecha: new Date().toISOString()
    });
  }
}
