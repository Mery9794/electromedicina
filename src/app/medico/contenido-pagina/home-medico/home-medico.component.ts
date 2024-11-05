import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../servicios/auth.service';
import { FavService } from '../../../favoritos/fav.service';
import { UserPaciente } from '../../../models';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit, OnDestroy {
  contadorSubscription: Subscription | undefined;
  totalPacientes: number = 0;

  constructor(
    private authService: AuthService,
    private favService: FavService
  ) { }
 
  ngOnInit() {
    // Obtén el ID del profesional que inició sesión
    this.authService.getUserProfesionalId().subscribe((idProfesional) => {
      if (idProfesional) {
        // Suscribirse al servicio para obtener la lista de todos los pacientes asociados al médico actual
        this.contadorSubscription = this.favService.getAllPacientes(idProfesional).subscribe((pacientes: UserPaciente[]) => {
          this.totalPacientes = pacientes.length;
        });
      }
    });
  }

  ngOnDestroy() {
    // Comprobamos si la suscripción está definida antes de desuscribirnos
    if (this.contadorSubscription) {
      this.contadorSubscription.unsubscribe();
    }
  }
}
