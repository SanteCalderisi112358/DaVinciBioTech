import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { DonazioneBody } from 'src/app/models/donazione-body.interface';
import { Donazione } from 'src/app/models/donazione.interface';
import { DvbtService } from 'src/app/services/dvbt.service';

@Component({
  templateUrl: './donazioni.component.html',
  styleUrls: ['./donazioni.component.scss']
})
export class DonazioniComponent implements OnInit {

  user!: AuthData|null
  isDonazione:boolean = false;
  donazioneBody!: DonazioneBody;
  donazione!:Donazione;
constructor(private autSrv:AuthService, private dvbtSrv:DvbtService){}
  ngOnInit(): void {
    this.autSrv.user$.subscribe((_user)=>{
      this.user= _user
      if(this.user){
        console.log(this.user?.utente)

      }else{
        console.log("Nessun si è loggato")
      }


    })  }


    creaDonazione(form:NgForm){
      this.isDonazione = false;
      if(this.user){
        this.donazioneBody = {
        importo: 0,
        data: '',
        utente:{
          id:this.user?.utente.id,
          nome:this.user?.utente.nome,
          cognome:this.user?.utente.cognome,
          email:this.user?.utente.email,
          ruolo:this.user?.utente.ruolo
        }
      };
      }

console.log(form.value)
const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  this.donazioneBody.data = formattedDate;
  this.donazioneBody.importo = form.value.importo
  if(this.user){
      this.donazioneBody.utente = this.user?.utente
    this.dvbtSrv.postDonazione(this.donazioneBody).subscribe((response)=>{
      if(response){
        this.donazione = response;
        console.log(this.donazione)
        setTimeout(() => {
          this.isDonazione = true;
        }, 2000);
      }
    },
    ((error:any)=>{
      console.error(error)
    })
)
  }


    }
}
