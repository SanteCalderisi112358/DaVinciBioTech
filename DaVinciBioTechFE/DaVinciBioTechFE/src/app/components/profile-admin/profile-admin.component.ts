import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Donazione } from 'src/app/models/donazione.interface';
import { Tavola } from 'src/app/models/tavola.interface';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteModificato } from 'src/app/models/utenteModifica.interface';
import { DvbtService } from 'src/app/services/dvbt.service';

@Component({
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  subUtenti: Subscription | undefined;
  subDonazioni: Subscription | undefined;
  utenti: Utente[] = [];
  donatori:Utente[]=[];
  currentPage: number = 1;
  currentPageD: number = 1;
  totalPagesArray: number[] = [];
  totalPagesArrayD:number[] =[]
  isDonatoriSelected: boolean = false;
  pageSize: number = 10;
  pageSizeD: number = 10;
  totalElementsUtenti:number=0;
  totalElementsDonatori:number=0;
  utente:Utente ={


    email:"",
    nome:"",
    cognome:"",
    ruolo: TipoRuolo.USER,
    id:""
  };
  idDonatore:string | undefined;
  isErroreUguale:boolean = false;
  isUtenteEliminato:boolean = false;
  donazioniDonatore:Donazione[]=[];
  errore: string | undefined;
  isUtenteModificato:boolean = false;
  isUtenteUser:boolean = false;
  utenteModificato:UtenteModificato={
    email:"",
    nome:"",
    cognome:"",
    ruolo: TipoRuolo.USER,

  };

  /*VARIABILI TAVOLE*/
  tavole:Tavola[]=[];
  subTavole: Subscription | undefined;
  currentPageTavole:number = 1;
  pageSizeTavole: number = 10;
  totalElementsTavole:number=0;
  totalPagesArrayTavole: number[] = [];

  constructor(private dvbtSrv: DvbtService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.loadPageUtenti(this.currentPage);
    this.loadPageTavole(this.currentPageTavole);

  }

  loadPageUtenti(page: number): void {
    if (this.isDonatoriSelected) {
      // Chiamata per ottenere solo i donatori
      console.log("Donatori")
      this.subUtenti = this.dvbtSrv.getAllUtentiDonatori(page - 1, this.pageSizeD, "cognome").subscribe((response: any) => {
        this.donatori = response['content'];
        this.totalPagesArrayD = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
        this.totalElementsDonatori = response['totalElements']
        console.log(this.totalElementsDonatori)
                console.log(this.donatori)

      });
    } else {
      // Chiamata per ottenere tutti gli utenti
      console.log("Utenti")
      this.subUtenti = this.dvbtSrv.getAllUtenti(page - 1, this.pageSize, "cognome").subscribe((response: any) => {
        this.utenti = response['content'];
        console.log(this.utenti)
        this.totalPagesArray = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
        this.totalElementsUtenti = response['totalElements']
        console.log(this.totalElementsUtenti)
        console.log(this.totalPagesArray)
      });
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.loadPageUtenti(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.loadPageUtenti(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPageUtenti(this.currentPage);
    }
  }
  setPageSize(size: number): void {
    console.log(size)
    this.pageSize = size;
this.loadPageUtenti(1)
  }

  setPageD(page: number): void {
    this.currentPageD = page;
    this.loadPageUtenti(this.currentPageD);
  }

  nextPageD(): void {
    if (this.currentPageD < this.totalPagesArrayD.length) {
      this.currentPageD++;
      this.loadPageUtenti(this.currentPageD);
    }
  }

  previousPageD(): void {
    if (this.currentPageD > 1) {
      this.currentPageD--;
      this.loadPageUtenti(this.currentPageD);
    }
  }
  setPageSizeD(size: number): void {
    console.log(size)
    this.pageSizeD = size;
this.loadPageUtenti(1)
  }
  toggleDonatoriSelection(): void {
    console.log(this.isDonatoriSelected)
    this.currentPage = 1;
    this.loadPageUtenti(this.currentPage);
    console.log(this.isDonatoriSelected)
  }

  apriModaleDonatore(donatore:Utente){
    this.authSrv.restore();
    const modal = document.getElementById('modaleDonatore');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.idDonatore = donatore.id;
      if(!this.idDonatore){
      console.log("Non esiste questo id")
      }else{
      this.utente = donatore;

      this.subDonazioni = this.dvbtSrv.getAllDonazioniByIdUtente(this.idDonatore).subscribe(
        (response) => {
          this.donazioniDonatore = response;
          console.log(this.donazioniDonatore);
        },
        (error:any)=>{
          this.errore = error.error.message
        }
      );



    }

}

  }

  chiudiModaleDonatore(): void {
    const modal = document.getElementById('modaleDonatore');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';

    }

  this.donazioniDonatore = [];
  this.errore = "";
  }


  deleteUtente(utente: Utente) {
    this.isUtenteEliminato = false;
    this.errore = ""
    console.log(utente);
    this.idDonatore = utente.id;
    console.log(this.idDonatore);
console.log("CIAO ELIMINAZIONE")
      if (this.idDonatore) {
      this.dvbtSrv.deleteUtenteStepOne(this.idDonatore).subscribe(
        () => {
          console.log('Richiesta HTTP DELETE inviata con successo');
        },
        (error:any) => {
          this.errore = error.error.message;
          console.log(this.errore)
          if(this.errore===`L'utente ${utente.nome} ${utente.cognome} ha eseguito delle donazioni. Vuoi eliminare anche le sue donazioni?`){
this.isErroreUguale=true;
this.isUtenteEliminato = false;
console.log("L'utente è stato eliminato?"+this.isUtenteEliminato)
console.log("IsUtente uguale a `L'utente ${utente.nome} ${utente.cognome} ha eseguito delle donazioni. Vuoi eliminare anche le sue donazioni?`"+this.isErroreUguale)
          }else{
            this.loadPageUtenti(this.currentPage);
          this.isUtenteEliminato = true;
          this.isErroreUguale=true;
          console.log("IsUtente uguale a `L'utente ${utente.nome} ${utente.cognome} ha eseguito delle donazioni. Vuoi eliminare anche le sue donazioni?`?"+this.isErroreUguale)
          console.log("L'utente è stato eliminato?"+this.isUtenteEliminato)
          }


        }
      );
    }

    this.isUtenteEliminato = false;


  }

apriModaleEliminaUtente(utente:Utente){

  this.utente = utente
  console.log(utente)
  this.errore = ""
  const modal = document.getElementById('modaleDeleteUtente');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
  }
}
  chiudiModaleEliminaUtenti(): void {
    this.isErroreUguale = false;
    const modal = document.getElementById('modaleDeleteUtente');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';

    }
  this.errore = "";
  this.isUtenteEliminato = false;
  }


  deleteUtenteAndDonazioni(utente:Utente){
    this.isUtenteEliminato = false;
    this.utente = utente;
    this.idDonatore = utente.id
    console.log(utente)
    console.log("Sto eliminando l'utente: "+this.utente.nome+" e le sue donazioni")
    if (this.idDonatore) {
      this.dvbtSrv.deleteUtenteAndDonazioni(this.idDonatore).subscribe(
        () => {
          console.log('Richiesta HTTP DELETE inviata con successo');
        },
        (error:any) => {
          this.errore = error.error.message;
          this.isUtenteEliminato = true;
          console.log(this.errore)
          this.loadPageUtenti(this.currentPage);

        }
      );
    }
    this.isUtenteEliminato = false;


  }


  deleteJustUtente(utente:Utente){
    this.isUtenteEliminato = false;
    this.utente = utente;
    this.idDonatore = utente.id
    console.log(utente)
    console.log("Sto eliminando SOLO l'utente: "+this.utente)
    if (this.idDonatore) {
      this.dvbtSrv.deleteJustUtente(this.idDonatore).subscribe(
        () => {
          console.log('Richiesta HTTP DELETE inviata con successo');
        },
        (error:any) => {
          this.errore = error.error.message;
          this.isUtenteEliminato = true;
          console.log(this.errore)
          this.loadPageUtenti(this.currentPage);

        }
      );
    }
    this.isUtenteEliminato = false;
  }

  apriModaleModificaUtente(utente:Utente){
    this.utente = utente;
    const modal = document.getElementById('modaleModificaUtente');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
    if(this.utente.ruolo===TipoRuolo.USER){
      this.isUtenteUser=true;
    }else if(this.utente.ruolo ===TipoRuolo.ADMIN){
            this.isUtenteUser = false;

    }

  }

  console.log("IsUtenteModificato: "+this.isUtenteModificato)
  }




modificaUtente(form: NgForm) {
this.utenteModificato.nome = form.value.nome;
this.utenteModificato.cognome = form.value.cognome;
this.utenteModificato.email = form.value.email;
if(form.value.ruolo){
  this.utenteModificato.ruolo = TipoRuolo.USER;
}else{
  this.utenteModificato.ruolo = TipoRuolo.ADMIN;

}
console.log(this.utente)
console.log(this.utenteModificato)
this.idDonatore=this.utente.id;
if(this.idDonatore){
  this.dvbtSrv.putUtente(this.idDonatore,this.utenteModificato).subscribe(
  () => {
    console.log('Richiesta HTTP PUT inviata con successo');
    this.isUtenteModificato=true;
    console.log("isUtenteModificato: "+this.isUtenteModificato)

  },
  (error:any) => {
    this.errore = error.error.message;
    console.log(this.errore)

  }
);
}



  }

  chiudiModaleModificaUtente(){
    this.isUtenteModificato=false;
    console.log("isUtenteModificato dopo chiusura: "+this.isUtenteModificato)

    const modal = document.getElementById('modaleModificaUtente');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isUtenteUser = false;
console.log("isUtenteUser dopo chiusura:"+this.isUtenteUser)
console.log("isUtenteModificatodopo chiusura:"+this.isUtenteModificato)
this.isUtenteEliminato=false;
this.loadPageUtenti(this.currentPage);


    }

  }
/* LOGICA TAVOLE*/
  loadPageTavole(page: number): void {

      this.subTavole=this.dvbtSrv.getAllTavoleAdmin(page - 1, this.pageSizeTavole, "anno").subscribe((response: any) => {
       this.tavole = response['content'];
       this.totalPagesArrayTavole = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
        this.totalElementsTavole = response['totalElements']
       console.log("Tavole")
       console.log(this.tavole)

      });

  }
  setPageSizeTavole(size: number): void {
    console.log(size)
    this.pageSizeTavole = size;
this.loadPageTavole(1)
  }
  setPageTavole(page: number): void {
    this.currentPageTavole = page;
    this.loadPageTavole(this.currentPageTavole);
  }

  nextPageTavole(): void {
    if (this.currentPageTavole < this.totalPagesArrayTavole.length) {
      this.currentPageTavole++;
      this.loadPageTavole(this.currentPageTavole);
    }
  }

  previousPageTavole(): void {
    if (this.currentPageTavole > 1) {
      this.currentPageTavole--;
      this.loadPageUtenti(this.currentPageTavole);
    }
  }




}


