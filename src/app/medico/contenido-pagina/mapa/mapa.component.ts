import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Metrica } from '../../../models';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @ViewChild(MapInfoWindow)
  infoWindow!: MapInfoWindow;
  apiLoaded: Promise<boolean>;
  pacientes: Metrica[] = [];
  center: google.maps.LatLngLiteral = { lat: -36.170487, lng: -67.9903073 }; // Coordenadas iniciales
  zoom = 6;
  markers: any[] = [];
  infoContent: string = '';

  constructor(private firestore: AngularFirestore) {
    // Cargar la API de Google Maps
    this.apiLoaded = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAFrOKz0er2mBbtyZNlQdqY1WHeALoiNWg`;
      script.onload = () => {
        resolve(true);
      };
      document.head.appendChild(script);
    });
  }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.firestore.collection<Metrica>('Metricas').valueChanges().subscribe((data) => {
      console.log("Datos recibidos de Firestore:", data); // Registro de los datos recibidos
      this.pacientes = data;
      this.updateMarkers();
    });
  }

  updateMarkers() {
    this.markers = this.pacientes.map(paciente => {
      if (paciente.ubicacion) {
        const [lat, lng] = paciente.ubicacion.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log("Información del paciente:", paciente); // Registro de la información del paciente
          return {
            position: { lat, lng } as google.maps.LatLngLiteral,
            title: `Paciente ID: ${paciente.idPaciente}\nNombre: ${paciente.paciente?.nombre}\nApellido: ${paciente.paciente?.apellido}`
          };
        }
      }
      return null;
    }).filter(marker => marker !== null);
  }

  onMarkerClick(marker: MapMarker, paciente: Metrica) {
    this.infoContent = `Paciente ID: ${paciente.idPaciente}<br>Nombre: ${paciente.paciente?.nombre}<br>Apellido: ${paciente.paciente?.apellido}`;
    console.log("Contenido de la información:", this.infoContent); // Registro del contenido de la información
    this.infoWindow.open(marker);
  }
}
