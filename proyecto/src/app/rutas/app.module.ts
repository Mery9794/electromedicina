import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //se agrego
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//Importa los componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';

// Importa las dependencias de Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';// Importa el módulo de Realtime Database
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
 
// Importa tu archivo de configuración de Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


import { IngresoPacienteComponent } from '../home/partes/ingreso-paciente/ingreso-paciente.component'; 
import { IngresoMedicoComponent } from '../home/partes/ingreso-medico/ingreso-medico.component'; 
import { InformacionComponent } from '../home/partes/informacion/informacion.component';
import { InicioComponent } from '../home/partes/inicio/inicio.component';
import { NavbarComponent } from '../home/partes/navbar/navbar.component';
import { RegistroDelPacienteComponent } from '../home/partes/ingreso-paciente/registro-del-paciente/registro-del-paciente.component';  
import { PaginaDelPacienteComponent } from '../home/partes/ingreso-paciente/pagina-del-paciente/pagina-del-paciente.component';  
import { PaginaMedicoComponent } from '../home/partes/ingreso-medico/pagina-medico/pagina-medico.component'; 
import { RegistroMedicoComponent } from '../home/partes/ingreso-medico/registro-medico/registro-medico.component'; 
import { AddFavsComponent } from '../favoritos/add-favs/add-favs.component';
import { ExpandirFavComponent } from '../favoritos/expandir-fav/expandir-fav.component'; 
import { FavService } from '../favoritos/fav.service'; 
import { FavoritoComponent } from '../favoritos/favorito/favorito.component';
import { HomeMedicoComponent } from '../home/partes/ingreso-medico/pagina-medico/home-medico/home-medico.component'; 
import { UbicacionComponent } from '../home/partes/ingreso-medico/pagina-medico/ubicacion/ubicacion.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  // Agrega otras rutas aquí si es necesario
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IngresoPacienteComponent,
    IngresoMedicoComponent,
    InformacionComponent,
    InicioComponent,
    NavbarComponent,
    RegistroDelPacienteComponent,
    PaginaDelPacienteComponent,
    PaginaMedicoComponent,
    RegistroMedicoComponent,
    AddFavsComponent,
    ExpandirFavComponent,
    FavoritoComponent,
    HomeMedicoComponent,
    UbicacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  //Se agrego
    FormsModule,  //Se agrego
    ReactiveFormsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore()),  //Se agrego
    AngularFireModule.initializeApp(environment.firebase), // Inicializa AngularFire con la configuración de Firebase
    AngularFireDatabaseModule, // Importa el módulo de Realtime Database
    RouterModule.forRoot(routes), // Configura las rutas aquí
    AngularFireAuthModule,
 
  ],
  providers: [FavService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
