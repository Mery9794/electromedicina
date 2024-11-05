import { Component, OnInit, OnDestroy } from '@angular/core';
import { Metrica, UserPaciente } from '../../models';
import { Subscription } from 'rxjs';
import { AuthService } from '../../servicios/auth.service';
import { FavService } from '../fav.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-favs',
  templateUrl: './add-favs.component.html',
  styleUrl: './add-favs.component.css'
})
export class AddFavsComponent implements OnInit, OnDestroy {
  pacientes: UserPaciente[] = [];
  showPatientList = false;
  pacienteSeleccionado: UserPaciente | null = null;
  contadorSubscription: Subscription | undefined;
  expandedPatientId: string | null = null;
  itemsToShow: number = 5; // Número de elementos a mostrar inicialmente
  pacientesSubscription: Subscription | undefined; // Suscripción a los pacientes

  constructor(private authService: AuthService, private favService: FavService, private router: Router,    private firestore: AngularFirestore) { }

  ngOnInit() {
    this.authService.getUserProfesionalId().subscribe(async (idProfesional) => {
      if (idProfesional) {
        this.loadPatients(idProfesional);
      }
    });
  }

  ngOnDestroy() {
    if (this.contadorSubscription) {
      this.contadorSubscription.unsubscribe();
    }
    if (this.pacientesSubscription) {
      this.pacientesSubscription.unsubscribe();
    }

  }

  showList() {
    this.showPatientList = !this.showPatientList;
  }

  async loadPatients(idProfesional: number) {
    try {
      console.log('ID del Profesional:', idProfesional);
      const pacientesData = await this.favService.getAllPacientes(idProfesional).toPromise();

      if (pacientesData) {
        this.pacientes = pacientesData;

        for (const paciente of this.pacientes) {
          paciente.edad = this.calcularEdad(paciente.fechaNacimiento);
          this.favService.getUltimaMetrica(paciente.idPaciente).then(metrica => {
            paciente.metricas = metrica ? [metrica] : []; // Almacenar la métrica en un arreglo
          }).catch(error => {
            console.error('Error al obtener la última métrica:', error);
          });
        }
      }
      console.log('Pacientes cargados:', this.pacientes);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  }

  
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

//Iconos de las metricas
  getIconForMetric(metrica: Metrica): string {
    switch (metrica.signoVital) {
      case 'Temperatura':
        return "fa-solid fa-temperature-high";
      case 'Pulso':
        return 'fa-heart';
      case 'Oxigeno':
        return 'fa-lungs';
      default:
        return 'fa-question';
    }
  }

  //Color del icono de la metrica
  getColorForMetric(metrica: Metrica): string {
    if (metrica.signoVital === 'Temperatura') {
      const temperatura = parseFloat(metrica.valor);
      if (temperatura >= 39.9) {
        return 'red';
      } else if (temperatura >= 37.0) {
        return 'orange';
      } else {
        return 'green';
      }
    } else if (metrica.signoVital === 'Pulso Cardíaco') {
      const pulso = parseFloat(metrica.valor);
      if (pulso < 70) {
        return 'red';
      } else if (pulso < 80) {
        return 'orange';
      } else {
        return 'green';
      }
    } else if (metrica.signoVital === 'Presión Arterial') {
      const [sistolica, diastolica] = metrica.valor.split('/');
      const sistolicaValue = parseFloat(sistolica);
      const diastolicaValue = parseFloat(diastolica);
      if (sistolicaValue < 120 && diastolicaValue < 80) {
        return 'green';
      } else if ((sistolicaValue >= 120 && sistolicaValue < 130) || (diastolicaValue >= 80 && diastolicaValue < 90)) {
        return 'orange';
      } else {
        return 'red';
      }
    }
    return 'green';
  }

  toggleHistorialClinico(paciente: UserPaciente): void {
    this.expandedPatientId = this.expandedPatientId === paciente.idPaciente.toString() ? null : paciente.idPaciente.toString();
  }

  verSignosVitales(paciente: UserPaciente): void {
    const nuevaVentana = window.open(`/signos-vitales/${paciente.idPaciente}`, `${paciente.idPaciente}`, 'height=600,width=800');
    if (nuevaVentana) {
      nuevaVentana.focus();
    } else {
      alert('No se pudo abrir una nueva ventana. Asegúrate de deshabilitar el bloqueo de ventanas emergentes.');
    }
  }

  toggleSignosVitales(event: MouseEvent, paciente: UserPaciente): void {
    event.stopPropagation();
    this.verSignosVitales(paciente);
  }

  setItemsToShow(count: number) {
    this.itemsToShow = Math.min(count, this.pacientes.length); // Asegura que no se exceda el número de pacientes disponibles
  }

  getStartIndex(): number {
    return this.pacientes.length > 0 ? 1 : 0;
  }

  getEndIndex(): number {
    return Math.min(this.itemsToShow, this.pacientes.length);
  }
}