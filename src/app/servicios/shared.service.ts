import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() {
    // Inicializa el BehaviorSubject con un valor vacío o algún valor predeterminado
    this.usuarioSubject = new BehaviorSubject<{ nombre: string; apellido: string }>({ nombre: '', apellido: '' });
  }
  
    // BehaviorSubject para almacenar el estado actual del usuario
    private usuarioSubject = new BehaviorSubject<{ nombre: string; apellido: string }>({ nombre: '', apellido: '' });
  
    // Observable expuesto para que los componentes se suscriban a cambios
    usuario$: Observable<{ nombre: string; apellido: string }> = this.usuarioSubject.asObservable();


  actualizarDatosProfesional(nombre: string, apellido: string) {
    // Actualizar el valor del BehaviorSubject con los nuevos datos del usuario
    this.usuarioSubject.next({ nombre, apellido });
  }
} 