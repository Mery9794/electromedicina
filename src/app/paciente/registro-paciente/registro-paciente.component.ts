import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Atiende, Metrica } from '../../models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { SharedService } from '../../servicios/shared.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
  registroForm: FormGroup;
  parteVisible: string = 'datosGenerales';
  registroExitoso: boolean = false;
  idProfesional: number | null = null; // Variable para almacenar el ID del profesional

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private sharedService: SharedService // Inyectar SharedService aquí
  ) {
    this.registroForm = this.formBuilder.group({
      // Define los campos del formulario aquí
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      tieneObraSocial: [false],
      nombreObraSocial: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el ID del profesional al iniciar el componente
    this.authService.getUserProfesionalId().subscribe(id => {
      this.idProfesional = id; // Almacenar el ID del profesional

      if (id !== null) {
        this.authService.getProfesionalData(id.toString()).subscribe(profesionalData => {
          if (profesionalData) {
            this.sharedService.actualizarDatosProfesional(profesionalData.nombre, profesionalData.apellido);
          }
        });
      }
    });
  }

  mostrarParte(parte: string) {
    this.parteVisible = parte;
  }

  mostrarParteAnterior() {
    switch (this.parteVisible) {
      case 'contacto':
        this.parteVisible = 'datosGenerales';
        break;
      case 'contrasena':
        this.parteVisible = 'contacto';
        break;
      default:
        break;
    }
  }

  mostrarParteSiguiente() {
    switch (this.parteVisible) {
      case 'datosGenerales':
        this.parteVisible = 'contacto';
        break;
      case 'contacto':
        this.parteVisible = 'contrasena';
        break;
      default:
        break;
    }
  }
  

  async registrarPaciente() {
    console.log('Registrando paciente...');

    // Verificar si el formulario es válido antes de continuar
    if (this.registroForm.valid) {
      const pacienteData = this.registroForm.value;

      try {
        // Verificar si se obtuvo correctamente el ID del profesional
        if (this.idProfesional === null) {
          console.error('No se pudo obtener el ID del profesional.');
          return;
        }

        // Obtener el contador actual de pacientes desde Firestore
        const firestoreInstance = this.firestore.firestore;
        const contadorDocRef = doc(firestoreInstance, 'Contadores/pacientes');
        const contadorSnapshot = await getDoc(contadorDocRef);
        let idPaciente;

        if (contadorSnapshot.exists()) {
          // Si ya existe el contador, incrementarlo
          const contadorActual = contadorSnapshot.data()['valor'];
          idPaciente = contadorActual + 1;
          await updateDoc(contadorDocRef, { valor: idPaciente });
        } else {
          // Si el contador no existe, inicializarlo en 1
          idPaciente = 1;
          await setDoc(contadorDocRef, { valor: idPaciente });
        }

        // Obtener la ubicación actual
        const location = await this.getCurrentLocation();

        // Guardar los datos del paciente en Firestore
        const pacienteDocRef = this.firestore.collection('Usuario: Pacientes').doc(idPaciente.toString());
        await pacienteDocRef.set({
          ...pacienteData,
          idPaciente: idPaciente,
          idProfesional: this.idProfesional // No es necesario convertirlo a string, ya que es un número
        });

        // Crear la métrica asociada al paciente
        const metrica: Metrica = {
          idMetrica: idPaciente,
          idPaciente: idPaciente,
          signoVital: '',
          valor: '',
          fecha: new Date().toISOString(),
          obs: '',
          ubicacion: location
        };
        await this.authService.addMetrica(metrica);

        // Crear el favorito asociado al paciente
        const atiende: Atiende = {
          idProfesional: this.idProfesional, // No es necesario convertirlo a string, ya que es un número
          idPaciente: idPaciente,
          fechaAlta: new Date().toISOString(),
          fechaBaja: '',
          obs: ''
        };
        await this.authService.vicuPacienteMedico(atiende);

        console.log('Datos del paciente registrados exitosamente:', pacienteData);

        // Marcar el registro como exitoso y mostrar el mensaje
        this.registroForm.reset();
        this.parteVisible = 'datosGenerales';
        this.registroExitoso = true;
        console.log('Paciente registrado exitosamente con ID:', idPaciente);
      } catch (error) {
        console.error('Error al registrar el paciente:', error);
      }
    } else {
      console.error('El formulario de registro no es válido.');
    }
  }

  // Método para obtener la ubicación actual del usuario
  getCurrentLocation(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const location = `${lat},${lng}`;
            resolve(location);
          },
          (error) => {
            reject('No se pudo obtener la ubicación');
          }
        );

      } else {
        reject('La geolocalización no es compatible con este navegador');
      }
    });
  }
}
