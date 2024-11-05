import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { IngresoMedicoComponent } from './medico/ingreso-medico/ingreso-medico.component';
import { PaginaMedicoComponent } from './medico/pagina-medico/pagina-medico.component';
import { RegistroMedicoComponent } from './medico/registro-medico/registro-medico.component';

import { IngresoPacienteComponent } from './paciente/ingreso-paciente/ingreso-paciente.component';
import { PaginaPacienteComponent } from './paciente/pagina-paciente/pagina-paciente.component';
import { RegistroPacienteComponent } from './paciente/registro-paciente/registro-paciente.component';

import { IngresoAdminComponent } from './admin/ingreso-admin/ingreso-admin.component';
import { PaginaAdminComponent } from './admin/pagina-admin/pagina-admin.component';

import { HistorialClinicoComponent } from './favoritos/historial-clinico/historial-clinico.component';
import { SignosVitalesComponent } from './favoritos/signos-vitales/signos-vitales.component';
import { InicioComponent } from './shared/inicio/inicio.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta por defecto

{ path: 'pacientes', component: IngresoPacienteComponent },
{ path: 'pagina-del-paciente', component: PaginaPacienteComponent },
{ path: 'registro-paciente', component: RegistroPacienteComponent },

{ path: 'medicos', component: IngresoMedicoComponent },
{ path: 'pagina-medico', component: PaginaMedicoComponent },
{ path: 'registro-medico', component: RegistroMedicoComponent },

{ path: 'pagina-admin', component: PaginaAdminComponent },
{ path: 'administrador', component: IngresoAdminComponent },

{ path: 'historial-clinico/:id', component: HistorialClinicoComponent },
{ path: 'signos-vitales/:id', component: SignosVitalesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
