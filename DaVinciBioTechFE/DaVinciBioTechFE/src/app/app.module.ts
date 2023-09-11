import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ChiSiamoComponent } from './components/chi-siamo/chi-siamo.component';
import { TavoleLeonardoComponent } from './components/tavole-leonardo/tavole-leonardo.component';
import { DonazioniComponent } from './components/donazioni/donazioni.component';
import { RegistrazioneComponent } from './auth/registrazione/registrazione.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ProfileAdminComponent } from './components/profile-admin/profile-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChiSiamoComponent,
    TavoleLeonardoComponent,
    DonazioniComponent,
    RegistrazioneComponent,
    LoginComponent,
    ProfileUserComponent,
    ProfileAdminComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
