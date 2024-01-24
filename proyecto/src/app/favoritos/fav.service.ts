import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs,  query, where, doc, getDoc } from '@angular/fire/firestore';
import { Metrica, UserF } from '../models/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavService  {
  

  private favoritosSubject = new BehaviorSubject<Metrica[]>([]);
  favoritos$: Observable<Metrica[]> = this.favoritosSubject.asObservable();


  constructor(private firestore: Firestore, private auth: AngularFireAuth,
    private afs: AngularFirestore) {
  }

  
  async addFav(user: UserF): Promise<void> {
    const userRef = collection(this.firestore, 'Favoritos');
    await addDoc(userRef, user);
    // Después de agregar un favorito, actualiza la lista de favoritos
    this.actualizarFavoritos();
  }

  async getFavoritos(): Promise<Metrica[]> {
    const querySnapshot = await getDocs(collection(this.firestore, 'Favoritos'));
    const favoritos = querySnapshot.docs.map(doc => doc.data() as Metrica);
    return favoritos;
  }

  private actualizarFavoritos(): void {
    // Actualiza la lista de favoritos y notifica a los suscriptores
    this.getFavoritos().then(favoritos => {
      this.favoritosSubject.next(favoritos);
    });
  }


  addMetrica(metrica: Metrica) {
    const userRef = collection(this.firestore, 'Metricas');
    return addDoc(userRef, metrica);
  }

  
}

