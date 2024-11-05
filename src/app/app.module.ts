import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioComponent } from './shared/inicio/inicio.component';
import { LoginComponent } from './shared/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { IngresoPacienteComponent } from './paciente/ingreso-paciente/ingreso-paciente.component';
import { PaginaPacienteComponent } from './paciente/pagina-paciente/pagina-paciente.component';
import { RegistroPacienteComponent } from './paciente/registro-paciente/registro-paciente.component';

import { IngresoMedicoComponent } from './medico/ingreso-medico/ingreso-medico.component';
import { PaginaMedicoComponent } from './medico/pagina-medico/pagina-medico.component';
import { RegistroMedicoComponent } from './medico/registro-medico/registro-medico.component';

import { HomeMedicoComponent } from './medico/contenido-pagina/home-medico/home-medico.component';
import { MapaComponent } from './medico/contenido-pagina/mapa/mapa.component';
import { AddFavsComponent } from './favoritos/add-favs/add-favs.component';
import { HistorialClinicoComponent } from './favoritos/historial-clinico/historial-clinico.component';
import { SignosVitalesComponent } from './favoritos/signos-vitales/signos-vitales.component';
import { FavService } from './favoritos/fav.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

// Importa las dependencias de Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './firebase/firebase-config/firebase-config.module';

import { PaginaAdminComponent } from './admin/pagina-admin/pagina-admin.component';
import { AdministradorComponent } from './admin/contenido-pagina/administrador/administrador.component';
import { AgendasComponent } from './admin/contenido-pagina/agendas/agendas.component';
import { InformesComponent } from './admin/contenido-pagina/informes/informes.component';
import { MedicosComponent } from './admin/contenido-pagina/medicos/medicos.component';
import { PacientesComponent } from './admin/contenido-pagina/pacientes/pacientes.component';
import { PerfilComponent } from './admin/contenido-pagina/perfil/perfil.component';
import { SharedService } from './servicios/shared.service';
import { FooterComponent } from './shared/footer/footer.component';
import { IngresoAdminComponent } from './admin/ingreso-admin/ingreso-admin.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: AppComponent },
  // Agrega otras rutas aquí si es necesario
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    NavbarComponent,
    IngresoPacienteComponent,
    PaginaPacienteComponent,
    RegistroPacienteComponent,
    PaginaMedicoComponent,
    RegistroMedicoComponent,
    HomeMedicoComponent,
    MapaComponent,
    AddFavsComponent,
    HistorialClinicoComponent,
    SignosVitalesComponent,
    PaginaAdminComponent,
    AdministradorComponent,
    AgendasComponent,
    InformesComponent,
    MedicosComponent,
    PacientesComponent,
    PerfilComponent,
    IngresoMedicoComponent,
    FooterComponent,
    IngresoAdminComponent
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de importar ReactiveFormsModule
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [FavService, SharedService, AngularFirestore, provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
