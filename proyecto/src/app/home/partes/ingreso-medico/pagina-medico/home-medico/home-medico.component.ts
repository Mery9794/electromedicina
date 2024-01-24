import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../servicios/auth.service/auth.service'; 
@Component({
  selector: 'app-home-medico',
  standalone: true,
  imports: [],
  templateUrl: './home-medico.component.html',
  styleUrl: './home-medico.component.css'
})
export class HomeMedicoComponent implements OnInit, OnDestroy {
  contador!: number;
  contadorSubscription!: Subscription;
 
  constructor(private Service: AuthService) { }
 
  ngOnInit() {
     this.contadorSubscription = this.Service.contadorObservable.subscribe(contador => {
       this.contador = contador;
     });
  }
 
  ngOnDestroy() {
     this.contadorSubscription.unsubscribe();
  }
 }