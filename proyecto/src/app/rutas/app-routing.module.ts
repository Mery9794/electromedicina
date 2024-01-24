import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionComponent } from '../home/partes/informacion/informacion.component';
import { IngresoPacienteComponent } from '../home/partes/ingreso-paciente/ingreso-paciente.component';  
import { IngresoMedicoComponent } from '../home/partes/ingreso-medico/ingreso-medico.component'; 
import { InicioComponent } from '../home/partes/inicio/inicio.component';
import { RegistroDelPacienteComponent } from '../home/partes/ingreso-paciente/registro-del-paciente/registro-del-paciente.component';  
import { PaginaDelPacienteComponent } from '../home/partes/ingreso-paciente/pagina-del-paciente/pagina-del-paciente.component';  
import { RegistroMedicoComponent } from '../home/partes/ingreso-medico/registro-medico/registro-medico.component'; 
import { PaginaMedicoComponent } from '../home/partes/ingreso-medico/pagina-medico/pagina-medico.component'; 

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'info', component: InformacionComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta por defecto

  { path: 'pacientes', component: IngresoPacienteComponent },
  { path: 'pagina-del-paciente', component: PaginaDelPacienteComponent },
  { path: 'registro-paciente', component: RegistroDelPacienteComponent },

  { path: 'medicos', component: IngresoMedicoComponent },
  { path: 'pagina-medico', component: PaginaMedicoComponent },
  { path: 'registro-medico', component: RegistroMedicoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
