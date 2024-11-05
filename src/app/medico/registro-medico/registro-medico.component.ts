import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Asegúrate de importar AngularFirestore correctamente
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-registro-medico',
  templateUrl: './registro-medico.component.html',
  styleUrls: ['./registro-medico.component.css'] // Corregí el nombre de la propiedad "styleUrl" a "styleUrls"
})
export class RegistroMedicoComponent implements OnInit {
  registroForm: FormGroup;
  parteVisible: string = 'datosGenerales';
  registroExitoso: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore
  ) {
    this.registroForm = this.formBuilder.group({
      // Campos para Datos Generales
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],

      // Campos para Contacto
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],

      // Campos para Contraseña
      contrasena: ['', Validators.required],
      perfil: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  mostrarParte(parte: string) {
    this.parteVisible = parte;
  }

  mostrarParteAnterior() {
    switch (this.parteVisible) {
      case 'contacto':
        this.parteVisible = 'datosGenerales';
        break;
      case 'perfil':
        this.parteVisible = 'contacto';
        break;
      case 'contrasena':
        this.parteVisible = 'perfil';
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
        this.parteVisible = 'perfil';
        break;
      case 'perfil':
        this.parteVisible = 'contrasena';
        break;
      default:
        break;
    }
  }

  async registrarProfesional() {
    console.log('Registrando profesional...');
    if (this.registroForm.valid) {
      const profesionalData = this.registroForm.value;
  
      try {
        // Obtener el contador actual de profesionales desde Firestore
        const contadorDocRef = doc(this.firestore.firestore, 'Contadores', 'profesionales');
        const contadorSnapshot = await getDoc(contadorDocRef);
        console.log('Contador actual:', contadorSnapshot.data()); // Registrar el contador actual para depurar
        let idProfesional;
  
        if (contadorSnapshot.exists()) {
          // Si ya existe el contador, incrementarlo
          const contadorActual = contadorSnapshot.data()['valor'];
          idProfesional = contadorActual + 1;
          console.log('Nuevo ID del profesional:', idProfesional); // Registrar el nuevo ID del profesional para depurar
  
          // Actualizar el contador en Firestore
          await updateDoc(contadorDocRef, { valor: idProfesional });
        } else {
          // Si no existe el contador, inicializarlo en 1
          idProfesional = 1;
          await setDoc(contadorDocRef, { valor: idProfesional });
          console.log('Nuevo ID del profesional:', idProfesional); // Registrar el nuevo ID del profesional para depurar
        }
  
        // Agregar el código para guardar los datos en Firestore 
        await setDoc(doc(this.firestore.firestore, 'Usuario: Profesionales', idProfesional.toString()), {
          ...profesionalData,
          idProfesional: idProfesional // Incluye el ID del profesional en los datos a guardar
        });
  
        // Marcar el registro como exitoso y mostrar el mensaje
        this.registroForm.reset();
        this.parteVisible = 'datosGenerales';
        this.registroExitoso = true;
  
        console.log('Profesional registrado con ID:', idProfesional);
      } catch (error) {
        console.error('Error al registrar profesional:', error);
      }
    }
  }
}  