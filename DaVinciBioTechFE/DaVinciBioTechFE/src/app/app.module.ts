import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrazioneComponent } from './auth/registrazione/registrazione.component';
import { LoginComponent } from './auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChiSiamoComponent } from './components/chi-siamo/chi-siamo.component';
import { ProfileAdminComponent } from './components/profile-admin/profile-admin.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { DonazioniComponent } from './components/donazioni/donazioni.component';
import { TavoleLeonardoComponent } from './components/tavole-leonardo/tavole-leonardo.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes= [
  {
    path: '',
    component: HomeComponent,

  },
  {
    path:'chi-siamo',
    component: ChiSiamoComponent,
  },
  {
    path:'tavole-leonardo',
    component: TavoleLeonardoComponent,
  },
  {
    path:'donazioni',
    component: DonazioniComponent,
    //canActivate: [AuthGuard],
  },
  {
    path:'profile-user',
    component: ProfileUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'profile-admin',
    component: ProfileAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'login',
    component:LoginComponent,

  },
  {
    path:'registrazione',
    component: RegistrazioneComponent,

  },
  {
    path:'**',
component: NotFoundComponent,
    //canActivate: [AuthGuard]
  }
]
@NgModule({
  declarations: [
   AppComponent,
   HomeComponent,
   ChiSiamoComponent,
   LoginComponent,
   RegistrazioneComponent,
   ProfileAdminComponent,
   ProfileUserComponent,
   DonazioniComponent,
   TavoleLeonardoComponent,
   NavbarComponent,
   FooterComponent,
   NotFoundComponent,
   DashboardComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CanvasJSAngularChartsModule,
    BrowserAnimationsModule,

  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
