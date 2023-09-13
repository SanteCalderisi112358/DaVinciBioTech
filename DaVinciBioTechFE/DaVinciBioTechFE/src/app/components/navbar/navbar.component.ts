import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: AuthData|null
ruolo: TipoRuolo | undefined;
  constructor(private autSrv:AuthService) { }

  ngOnInit(): void {
    this.autSrv.user$.subscribe((_user)=>{
      this.user= _user
      if(this.user){
        console.log(this.user?.utente)
       this.ruolo = this.user?.utente.ruolo;
       console.log(this.ruolo)
      }else{
        console.log("Nessun si è loggato")
      }


    })
  }

  logout(){
    this.autSrv.logout()
  }
}
