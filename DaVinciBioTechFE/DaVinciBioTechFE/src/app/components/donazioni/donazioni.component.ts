import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  templateUrl: './donazioni.component.html',
  styleUrls: ['./donazioni.component.scss']
})
export class DonazioniComponent implements OnInit {

  user!: AuthData|null
constructor(private autSrv:AuthService){}
  ngOnInit(): void {
    this.autSrv.user$.subscribe((_user)=>{
      this.user= _user
      if(this.user){
        console.log(this.user?.utente)

      }else{
        console.log("Nessun si è loggato")
      }


    })  }

}
