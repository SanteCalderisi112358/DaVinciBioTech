import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Donazione } from 'src/app/models/donazione.interface';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteModificato } from 'src/app/models/utente-modifica-from-admin.interface';
import { DvbtService } from 'src/app/services/dvbt.service';
import { UtenteModifica } from 'src/app/models/utente-modifica-from-user.interface';

@Component({
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit, AfterViewInit {
  user!: AuthData | null
  areDonazioni: boolean = false;
  donazioniUtente: Donazione[] = []
  subDonazioni: Subscription | undefined;
  isDashboardOpen: boolean = false;
  isModaleOpen: boolean = false;
  erroreDonazioni: string = ''
  isErrore: boolean = false
  isUtenteModificato:boolean = false
  @ViewChild('scena') scena!: ElementRef;
  @ViewChild('carta1') carta1!: ElementRef;
  @ViewChild('carta2') carta2!: ElementRef;
  @ViewChild('carta3') carta3!: ElementRef;
  @ViewChild('carta4') carta4!: ElementRef;
  @ViewChild('button') button!: ElementRef;
  @ViewChild('titolo') titolo!: ElementRef;
  @ViewChild('sottoTitolo') sottoTitolo!: ElementRef;
  @ViewChild('noPlay') noPlay!: ElementRef;
  @ViewChild('disabilitaButton') disabilitaButton!: ElementRef;
  isLoading: boolean = false
  errori: string[] = []
  errore: string = ''


  utenteModidicato: UtenteModifica = {

    nome: '',
    cognome: '',
    email: '',
    ruolo: TipoRuolo.USER,
    password:''

  }

  utente: Utente = {
    id: '',
    nome: '',
    cognome: '',
    email: '',
    ruolo: TipoRuolo.USER

  }
  carte: ElementRef[] = [this.carta1, this.carta2, this.carta3, this.carta4]
  immaginiRetro: string[] = ['https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_valvole_cardiache.jpeg', 'https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_spalla.jpeg', 'https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_dito_piede.jpeg', 'https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_interna_ginocchio.jpeg']
  constructor(private autSrv: AuthService, private dvbtSrv: DvbtService) { }
  ngOnInit(): void {

    this.autSrv.user$.subscribe((_user) => {
      this.user = _user
      if (this.user) {
        this.utente = this.user?.utente
        console.log(this.user?.utente)
      } else {
        console.log("Nessun si è loggato")
      }


    })

  }

  ngAfterViewInit(): void {
    console.log(this.carta1)
    console.log(this.scena.nativeElement)
    this.button.nativeElement.addEventListener('click', () => {
      this.sottoTitolo.nativeElement.classList.add('opacity-on');
      this.noPlay.nativeElement.classList.remove('disabilita');

      this.scena.nativeElement.classList.remove('blur')
      //this.noPlay.nativeElement.classList.add('removeBlock');
      this.noPlay.nativeElement.innerHTML = ""
      this.carta1.nativeElement.classList.toggle('avvia1');
      this.carta2.nativeElement.classList.toggle('avvia2');
      this.carta3.nativeElement.classList.toggle('avvia3');
      this.carta4.nativeElement.classList.toggle('avvia4');
      this.button.nativeElement.style.opacity = '0'

    });

    this.carta1.nativeElement.addEventListener('click', () => {
      this.carta1.nativeElement.classList.toggle('scopriCarta');
      const retroCarta = this.carta1.nativeElement.querySelector('.carta-face--back1');
      const backgroundImage = window.getComputedStyle(retroCarta).getPropertyValue('background-image');
      console.log('Background-image:', backgroundImage);
      if (backgroundImage === 'url("https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_valvole_cardiache.jpeg")') {
        console.log(true)
        this.noPlay.nativeElement.innerText = '❤️';
        this.scena.nativeElement.classList.add('blur')
        this.button.nativeElement.style.opacity = '1'

      }

    });


    this.carta2.nativeElement.addEventListener('click', () => {
      this.carta2.nativeElement.classList.toggle('scopriCarta');
      const retroCarta = this.carta2.nativeElement.querySelector('.carta-face--back2');
      const backgroundImage = window.getComputedStyle(retroCarta).getPropertyValue('background-image');
      console.log('Background-image:', backgroundImage);
      if (backgroundImage === 'url("https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_valvole_cardiache.jpeg")') {
        console.log(true)
        this.noPlay.nativeElement.innerText = '❤️';
        this.noPlay.nativeElement.classList.add('disabilita');
        this.button.nativeElement.style.opacity = '1'

      }

    });

    this.carta3.nativeElement.addEventListener('click', () => {
      this.carta3.nativeElement.classList.toggle('scopriCarta');
      const retroCarta = this.carta3.nativeElement.querySelector('.carta-face--back3');
      const backgroundImage = window.getComputedStyle(retroCarta).getPropertyValue('background-image');
      console.log('Background-image:', backgroundImage);
      if (backgroundImage === 'url("https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_valvole_cardiache.jpeg")') {
        console.log(true)
        this.noPlay.nativeElement.innerText = '❤️';
        this.noPlay.nativeElement.classList.add('disabilita');
        this.scena.nativeElement.classList.add('blur')
        this.button.nativeElement.style.opacity = '1'

      }
    });

    this.carta4.nativeElement.addEventListener('click', () => {
      this.carta4.nativeElement.classList.toggle('scopriCarta');
      const retroCarta = this.carta4.nativeElement.querySelector('.carta-face--back4');
      const backgroundImage = window.getComputedStyle(retroCarta).getPropertyValue('background-image');
      console.log('Background-image:', backgroundImage);
      if (backgroundImage === 'url("https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_valvole_cardiache.jpeg")') {
        console.log(true)
        this.noPlay.nativeElement.innerText = '❤️';
        this.noPlay.nativeElement.classList.add('disabilita');
        this.scena.nativeElement.classList.add('blur')
        this.button.nativeElement.style.opacity = '1'

      }
    });

    this.carta1.nativeElement.addEventListener('click', () => {
      this.clickCarta()
    })
    this.carta2.nativeElement.addEventListener('click', () => {
      this.clickCarta()
    })
    this.carta3.nativeElement.addEventListener('click', () => {
      this.clickCarta()
    })
    this.carta4.nativeElement.addEventListener('click', () => {
      this.clickCarta()
    })
  }


  clickCarta() {
    this.carta3.nativeElement.id = 'Cuore';
    this.carta1.nativeElement.id = 'id-1';
    this.carta2.nativeElement.id = 'id-2';
    this.carta4.nativeElement.id = 'id-4';

  }


  toggleDashboard() {
    this.isDashboardOpen = !this.isDashboardOpen;
  }


  apriModalePutDati() {



    const modal = document.getElementById('modalePassword')
    if (modal) {
      modal.classList.add('show')
      modal.style.display = 'block'
    }
  }
  putUtente(form: NgForm) {
    this.isErrore = false
    this.errori = []
    this.utenteModidicato.nome = form.value.nome
    this.utenteModidicato.cognome = form.value.cognome
    this.utenteModidicato.email = form.value.email
    this.utenteModidicato.password = form.value.password

    if(this.user?.utente.id){
       this.dvbtSrv.putUtenteFromUtente(this.user?.utente?.id, this.utenteModidicato).subscribe((utente:Utente)=>{
        if(utente){
          this.isErrore = false
          this.isUtenteModificato = true
          if(this.user){
            this.user.utente = utente
            console.log(this.user.utente)
            const accesstokenPost = this.user.accessToken
            const utenteToke = {
              accessToken: accesstokenPost,
              utente: this.user.utente

            }

        localStorage.setItem('utente', JSON.stringify(utenteToke));

          }


        }


       },
       (error:any)=>{
this.errori = error.error.errorsList
console.log(this.errori)
console.log(this.errori.length)
if(this.errori){

  this.isErrore = true
}
})


    }


      }

  chiudiModalePassword() {
    this.isModaleOpen = false;
    const modal = document.getElementById('modalePassword')
    if (modal) {
      modal.classList.remove('show')
      modal.style.display = 'none'
    }
  }

  apriModaleDonazioni() {
    this.isModaleOpen = true;
    console.log(this.isModaleOpen)
    const modal = document.getElementById('modaleDonazioni')
    if (modal) {
      modal.classList.add('show')
      modal.style.display = 'block'
      const idUtente = this.user?.utente.id;
      if (idUtente) {
        this.dvbtSrv.getDonazioniFromUser(idUtente).subscribe((response) => {
          this.donazioniUtente = response;
          console.log(this.donazioniUtente)
        },
          (error: any) => {
            this.erroreDonazioni = error.error.message;
            console.log(this.erroreDonazioni)
            this.isErrore = true;
          }
        )

      }
    }
  }

  chiudiModaleDonazioni() {
    this.isErrore = false
    this.erroreDonazioni = ''
    this.isModaleOpen = false;
    const modal = document.getElementById('modaleDonazioni')
    if (modal) {
      modal.classList.remove('show')
      modal.style.display = 'none'
    }
  }



}







