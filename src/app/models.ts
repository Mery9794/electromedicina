export interface UserProfesional {
    idProfesional: number;
    nombre: string;
    apellido: string;
    dni: number;
    fechaNacimiento: number;
    sexo: string;
    email: string;
    telefono: number;
    contrasena: string;
    perfil: string;
  }
  export interface UserPaciente {
    alta: boolean;
    idPaciente: number;
    nombre: string;
    apellido: string;
    dni: number;
    fechaNacimiento: string;
    sexo: string;
    telefono: number;
    tieneObraSocial:boolean;
    nombreObraSocial?:string;
    email: string;
    contrasena: string;
    metricas?: Metrica[]; // Cambiar a metricas en plural
    conexion?: Atiende; //propiedad de conexion
    edad?: number;
    medico?: UserProfesional[];
  }
  
  export interface Atiende {
    idProfesional:number;
    idPaciente:number;
    fechaAlta: string;
    fechaBaja: string;
    obs:string;
    metrica?: Metrica;  // contiene los detalles de la métrica
  }
  export interface Metrica {
    idMetrica: number;
    idPaciente: number;
    signoVital:string;
    valor:string;
    fecha: string;
    obs: string;
    paciente?: UserPaciente; // almacenar el UserPaciente correspondiente
    ubicacion: string;
  }
  export interface ProfesionalData {
    apellido: string;
    nombre: string;
    // Agrega otros campos si es necesario
  }
  