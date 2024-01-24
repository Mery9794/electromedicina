import { Component, EventEmitter, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Metrica } from '../../models/models';

@Component({
  selector: 'app-expandir-fav',
  standalone: true,
  imports: [],
  templateUrl: './expandir-fav.component.html',
  styleUrl: './expandir-fav.component.css'
})
export class ExpandirFavComponent {

  @Input() paciente: any;
  @Input() pacienteDatos: any;

  @ViewChild('canvas', { static: false })
  canvas!: ElementRef;


  pacienteSeleccionado: Metrica | null = null;


  constructor() { 
    
  }

  ventanaFlotanteVisible: boolean = true;

  cerrarVentanaFlotante() {
    this.ventanaFlotanteVisible = false;
  }


  ngAfterViewInit() {
     const ctx = this.canvas.nativeElement.getContext('2d');
     ctx.rect(20, 20, 160, 60);
     ctx.stroke();
 
     ctx.font = "12px Arial";
     ctx.fillText("Temperatura en °C", 50, 50);
  }
 }