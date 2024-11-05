import { Component, Input, OnInit } from '@angular/core';
import { Metrica, UserPaciente } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { FavService } from '../fav.service';



@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrl: './historial-clinico.component.css'
})
export class HistorialClinicoComponent implements OnInit {
  @Input() paciente: UserPaciente | undefined;
  historialClinico: Metrica[] = [];
  loading: boolean = true;
  edicionActivadaPaciente: boolean = false;
  metrica: Metrica | undefined;
  edicionActivadaMetrica: boolean = false;

  constructor(private route: ActivatedRoute, private favService: FavService) { }

 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pacienteId = +params['id']; // Convertir el parámetro a número
      this.loadPaciente(pacienteId);
      this.loadHistorialClinico(pacienteId);
    });
  }

  loadPaciente(id: number): void {
    this.favService.getPacienteById(id).subscribe(paciente => {
      if (paciente) {
        this.paciente = paciente;
        this.paciente.edad = this.calcularEdad(paciente.fechaNacimiento);

        if (!this.paciente.metricas) {
          this.paciente.metricas = [];
        }
      }
    });
  }


  loadHistorialClinico(idPaciente: number): void {
    this.favService.getHistorialClinico(idPaciente).subscribe(historial => {
      this.historialClinico = historial;
      this.loading = false;
    });
  }

  // Calcula la edad del paciente a partir de su fecha de nacimiento
  calcularEdad(fechaNacimiento: string): number {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  activarEdicionPaciente(): void {
    this.edicionActivadaPaciente = true;
  }


  cancelarEdicion(): void {
    this.edicionActivadaPaciente = false;
    this.edicionActivadaMetrica = false;
  }

  guardarCambios(): void {
    if (this.paciente) {
      this.favService.actualizarPaciente(this.paciente).then(() => {
        console.log('Los cambios se han guardado correctamente.');
        this.edicionActivadaPaciente = false;
      }).catch(error => {
        console.error('Error al guardar los cambios:', error);
      });
    }
  }

  toggleObraSocial(value: boolean): void {
    if (this.paciente) {
      this.paciente.tieneObraSocial = value;
    }
  }
 
}