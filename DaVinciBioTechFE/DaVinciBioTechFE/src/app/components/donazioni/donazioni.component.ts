import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { DonazioneBody } from 'src/app/models/donazione-body.interface';
import { Donazione } from 'src/app/models/donazione.interface';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';
import { DvbtService } from 'src/app/services/dvbt.service';
import { environment_STRIPE } from 'src/environments/environment';

@Component({
  templateUrl: './donazioni.component.html',
  styleUrls: ['./donazioni.component.scss']
})
export class DonazioniComponent implements OnInit {
  stripeAPIKey: string = environment_STRIPE.stripe_test_key
  paymentHandler: any = null;
  user!: AuthData|null
  isDonazione:boolean = false;
  donazioneBody!: DonazioneBody;
  donazione!:Donazione;
constructor(private autSrv:AuthService, private dvbtSrv:DvbtService, private router:Router){}
  ngOnInit(): void {


    this.autSrv.user$.subscribe((_user)=>{
      this.user= _user
      if(this.user){
        console.log(this.user?.utente)

      }else{
        console.log("Nessun si è loggato")
      }
      this.invokeStripe();
    })  }

    makePayment(amount: any) {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: this.stripeAPIKey,
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          //alert('Stripe token generated!');
          const modaleRingraziamento = window.document.getElementById('thanks')
          if(modaleRingraziamento){
            modaleRingraziamento.classList.add('show')
            modaleRingraziamento.style.display = 'block';
          }
        },

      });



      paymentHandler.open({
        name: 'DaVinciBioTech',
        description: 'Sostieni la nostra causa',
        amount: amount * 100,
        img:'https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_braccio.jpeg',
        email: this.user?.utente.email,
        nostyle: true,
        currency: 'eur',
        submit_type: 'donate',



      });
    }


    creaDonazione(form:NgForm){
      this.isDonazione = false;
      if(this.user){
        this.donazioneBody = {
        importo: 0,
        data: '',
        numeroCarta:'',
        cvc: '',
        mese:'',
        anno:'',
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
this.makePayment(this.donazioneBody.importo)

    }

    invokeStripe() {
      if (!window.document.getElementById('stripe-script')) {
        const script =document.createElement('script');

        script.id = 'stripe-script';
        script.type = 'text/javascript';
        script.src = 'https://checkout.stripe.com/checkout.js';
        script.onload = () => {
          this.paymentHandler = (<any>window).StripeCheckout.configure({
            key: this.stripeAPIKey,
            locale: 'auto',
            token: function (stripeToken: any) {
              console.log(stripeToken);
              alert('Payment has been successfull!');
            },
          });

        };

        window.document.body.appendChild(script);
      }
    }

    chiudiModaleRingraziamnto(){
      this.isDonazione = false
      const modaleRingraziamento = window.document.getElementById('thanks')
          if(modaleRingraziamento){
            modaleRingraziamento.classList.remove('show')
            modaleRingraziamento.style.display = 'none';
            if(this.user?.utente.ruolo===TipoRuolo.USER)
            this.router.navigate(['/profile-user']);
            if(this.user?.utente.ruolo===TipoRuolo.ADMIN)
            this.router.navigate(['/profile-admin']);
          }
    }


  }

