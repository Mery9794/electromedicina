import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavService } from '../../../favoritos/fav.service';
import { UserProfesional } from '../../../models';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.css'
})
export class MedicosComponent implements OnInit, OnDestroy {
  contador!: number;
  contadorSubscription!: Subscription;
  totalProfesionales!: number;
  showProfessionalList = false;
  medicos: UserProfesional[] = [];
  medicoSeleccionado: UserProfesional | null = null;
  ventanaFlotanteVisible: boolean = false;

  constructor(private favService: FavService) {}

  ngOnInit() {
    // Utiliza el nuevo método getTotalMedicos para obtener la cantidad de médicos
    this.contadorSubscription = this.favService.getTotalMedicos().subscribe(totalMedicos => {
      this.contador = totalMedicos;
    });


    // Obtén la lista de todos los profesionales
    this.favService.getAllProfesionales().subscribe((medicos) => {
      this.totalProfesionales = medicos.length;
      this.medicos = medicos;
    });
  }

  ngOnDestroy() {
    this.contadorSubscription.unsubscribe();
  }


  verPerfil(medico: UserProfesional): void {
    this.medicoSeleccionado = medico;
    this.ventanaFlotanteVisible = true;
  }

  darDeBaja(medico: UserProfesional): void {
    const confirmacion = confirm('¿Estás seguro de dar de baja a este médico?');

    if (confirmacion) {
        // Eliminar al médico de la lista
        this.medicos = this.medicos.filter((m) => m !== medico);

        // Actualizar la cantidad de médicos
        this.contador--;

        // Actualizar la base de datos (aquí debes implementar tu lógica específica)
        this.favService.darDeBajaProfesional(medico); // Llamando a la función con un solo parámetro
    }
}

  cerrarVentanaFlotante(): void {
    this.ventanaFlotanteVisible = false;
  }
}
