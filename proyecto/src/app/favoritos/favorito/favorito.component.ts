import { Component, OnInit } from '@angular/core';
import { FavService } from '../fav.service'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Metrica, UserI } from '../../models/models'; 
import { Observable, Subscription } from 'rxjs';
import { getDatabase, push, ref } from 'firebase/database';
import { FirebaseApp } from '@angular/fire/compat';

@Component({
  selector: 'app-favorito',
  standalone: true,
  imports: [],
  templateUrl: './favorito.component.html',
  styleUrl: './favorito.component.css'
})
export class FavoritoComponent implements OnInit {

  pacientesFavoritos: Metrica[] = [];
  pacienteExpandido: Metrica | null = null;
  pacientes: any[] = [];
  ventanaFlotanteVisible = false;
  pacienteSeleccionado: Metrica | null = null;


  favoritosSubscription: Subscription = new Subscription;

  constructor(
    private firebaseApp: FirebaseApp,
    private authService: FavService,
    private firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void { 
    // Suscríbete al observable del servicio para recibir actualizaciones
    this.favoritosSubscription = this.authService.favoritos$.subscribe(favoritos => {
      this.pacientesFavoritos = favoritos;
    });

    
    
 }

 ngOnDestroy(): void {
    // Cancela la suscripción al observable cuando el componente se destruye
    this.favoritosSubscription.unsubscribe();
 }



expandirVentanaFlotante(paciente: Metrica): void {
  this.pacienteSeleccionado = paciente;
  
  this.ventanaFlotanteVisible = true;
}

}
