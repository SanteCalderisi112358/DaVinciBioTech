import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { DonazioneBody } from 'src/app/models/donazione-body.interface';
import { Donazione } from 'src/app/models/donazione.interface';
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
constructor(private autSrv:AuthService, private dvbtSrv:DvbtService){}
  ngOnInit(): void {
    this.invokeStripe();
    this.autSrv.user$.subscribe((_user)=>{
      this.user= _user
      if(this.user){
        console.log(this.user?.utente)

      }else{
        console.log("Nessun si è loggato")
      }


    })  }

    makePayment(amount: any) {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: this.stripeAPIKey,
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          alert('Stripe token generated!');
        },
      });

      //const cvcInput = window.document.getElementById('script').getEle;
      const numeroCartaInput = document.getElementById('card_number') as HTMLInputElement;
      const mm_aaInput = document.getElementById('cc-exp') as HTMLInputElement;

      if (numeroCartaInput && mm_aaInput) {
        numeroCartaInput.style.border = '10px solid black';
        mm_aaInput.value = `ew/rw`;
      }

      paymentHandler.open({
        name: 'DaVinciBioTech',
        description: 'Pagamento online',
        amount: amount * 100,
        email: this.user?.utente.email,
        nostyle: true,
        currency: 'eur',
        submit_type: 'donate',
        payment_method_types: ['card'],

        submit: {
          message: `Grazie ${this.donazioneBody.utente.nome} per la donazione. Riceverai a breve una email.`,
        },

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
        const script = window.document.createElement('script');

        script.id = 'stripe-script';
        script.type = 'text/javascript';
        script.src = 'https://checkout.stripe.com/checkout.js';
        script.innerHTML ='PROVO A MODIFICARE SCRIPT'
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
  }

