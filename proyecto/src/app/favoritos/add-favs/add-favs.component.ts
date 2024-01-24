import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, push } from 'firebase/database';
import { FirebaseApp } from '@angular/fire/compat';
import { FavService } from '../fav.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Metrica, UserF, UserI } from '../../models/models'; 
import { doc, getDoc, getFirestore, setDoc, increment } from 'firebase/firestore';


@Component({
  selector: 'app-add-favs',
  standalone: true,
  imports: [],
  templateUrl: './add-favs.component.html',
  styleUrl: './add-favs.component.css'
})
export class AddFavsComponent  {
  pacientes: any[] = [];
  showPatientList = false;
  private contador = 0;
  usuario = { nombre: '', apellido: '' };

  constructor(
    private db: AngularFireDatabase,
    private firebaseApp: FirebaseApp,
    private authService:FavService,
    private firebaseAuth: AngularFireAuth
  ) {
    this.db.list('/pacientes').valueChanges().subscribe(data => {
      this.pacientes = data;
    });

    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        const nombre = user.displayName;
        const apellido = user.photoURL;
        // Se tiene el nombre y el apellido del usuario
      }
    });

    // Recuperar el contador almacenado en Firestore
    this.initializeCounter();
  }


  showList() {
    this.showPatientList = !this.showPatientList;
  }

  pacienteSeleccionado: UserI | null = null;
  ventanaFlotanteVisible: boolean = false;

  expandirVentanaFlotante(paciente: UserI): void {
    this.pacienteSeleccionado = paciente;

    this.ventanaFlotanteVisible = true;
  }

  cerrarVentanaFlotante() {
    this.ventanaFlotanteVisible = false;
  }

  async initializeCounter() {
    const db = getFirestore(this.firebaseApp);
    const counterDoc = doc(db, 'counters', 'favoriteCounter');

    const counterSnapshot = await getDoc(counterDoc);

    if (counterSnapshot.exists()) {
      // Si el documento existe, obtenemos el valor del contador
      this.contador = counterSnapshot.data()['value'];
    } else {
      // Si no existe, lo creamos
      await setDoc(counterDoc, { value: this.contador });
    }
  }

  async updateCounter(value: number) {
    const db = getFirestore(this.firebaseApp);
    const counterDoc = doc(db, 'counters', 'favoriteCounter');
    await setDoc(counterDoc, { value: increment(value) });
  }
 
  async addFavoritos(paciente: {
    nombre: string, apellido: string, dni: number, edad: number, dato: string,
    valor: number
  }) {
    const database = getDatabase(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);

    try {
      // Obtén el usuario actual
      const user = await this.firebaseAuth.currentUser;
      console.log('Datos del usuario:', user);
      if (user) {
        // Incrementa el contador de favoritos
        this.contador++;
        // Actualiza el contador almacenado en Firestore
        await this.updateCounter(this.contador);
        // Crea una referencia para la lista de favoritos
        const favoritosRef = ref(database, 'favoritos');

 // FAVORITO

        // Guarda la información en la base de datos de REALTIME DATABASE
        push(favoritosRef, {
          pacienteNombre: paciente.nombre,
          pacienteApellido: paciente.apellido,
          pacienteDni: paciente.dni,
          profesionalNombre: user.displayName || '',
          profesionalApellido: user.photoURL || '',
          timestamp: new Date().toString()
        });

        // Guarda la información en la base de datos de FIRESTORE DATABASE
        const userFirestore: UserF = {
          pacienteNombre: paciente.nombre,
          pacienteApellido: paciente.apellido,
          pacienteDni: paciente.dni,
          profesionalNombre: user.displayName || '',
          profesionalApellido: user.photoURL || '',
          entrada: new Date().toString(),
          idfavoritos: this.contador // Utiliza el valor incrementado 
        };
        // Utiliza el servicio FavServiceService para guardar los datos en Firestore
        const favo = await this.authService.addFav(userFirestore);
        console.log('Favorito guardado correctamente en Firestore:', favo);

     // METRICA
        // Crea una referencia para la lista de métricas
        const metricasRef = ref(database, 'metricas');

        // Guarda la información en la base de datos de REALTIME DATABASE
        push(metricasRef, {
          pacienteNombre: paciente.nombre,
          pacienteApellido: paciente.apellido,
          pacienteDni: paciente.dni,
          dato: '',
          valor: '',
          fecha: new Date().toString(),
          obs: '',
          idMetricas: this.contador // Utiliza el valor incrementado 
        });
        // Guarda la información en la base de datos de FIRESTORE DATABASE
        const metricaFirestore: Metrica = {
          pacienteNombre: paciente.nombre,
          pacienteApellido: paciente.apellido,
          pacienteDni: paciente.dni,
          dato: '',
          valor: 0,
          fecha: new Date().toString(),
          obs: '',
          idMetricas: this.contador // Utiliza el valor incrementado 

        };

        // Utiliza el servicio FavServiceService para guardar los datos en Firestore
        const met = await this.authService.addMetrica(metricaFirestore);
        console.log('Metrica guardada correctamente en Firestore:', met);

      } else {
        console.error('No se pudo obtener el usuario actual.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
    }
  }
}
 