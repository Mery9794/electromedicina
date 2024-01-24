export interface UserI {
  nombre: string;
  apellido: string;
  dni: number;
  edad: number;
  fechaNacimiento: number;
  sexo: string;
  email: string;
  telefono: number;
  usuario: string;
  contrasena: string;
  perfil:string;
  id: string;
} 

export interface UserF {
  idfavoritos: number;
  pacienteNombre: string;
  pacienteApellido: string;
  pacienteDni:number;
  profesionalNombre: string;
  profesionalApellido: string;
  entrada: string;
}
export interface Metrica {
  idMetricas: number;
  pacienteNombre: string;
  pacienteApellido: string;
  pacienteDni: number;
  dato: string;
  valor: number;
  fecha: string;
  obs: string;

}