/*import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utente } from 'src/app/models/utente.interface';
import { DvbtService } from 'src/app/services/dvbt.service';

@Component({
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  subUtenti: Subscription | undefined;
  utenti: Utente[] = [];
  currentPage: number = 1;
  totalPagesArray: number[] = [];
  pageSize: number = 10;
  constructor(private dvbtSrv: DvbtService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.subUtenti = this.dvbtSrv.getAllUtenti(page - 1, this.pageSize, "nome").subscribe((response: any) => {
      this.utenti = response['content'];
      this.totalPagesArray = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.loadPage(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  setPageSize(size: number): void {
    console.log(size)
    this.pageSize = size;
this.loadPage(1)
  }
}*/

import { Component, OnInit } from '@angular/core';
import { Subscription, catchError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Donazione } from 'src/app/models/donazione.interface';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';
import { Utente } from 'src/app/models/utente.interface';
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
  utente:Utente ={


    email:"",
    nome:"",
    cognome:"",
    ruolo: TipoRuolo.User,
    id:""
  };
  idDonatore:string | undefined;
  isErroreUguale:boolean = false;
  isUtenteEliminato:boolean = false;
  donazioniDonatore:Donazione[]=[];
  errore: string | undefined;
  constructor(private dvbtSrv: DvbtService, private authSrv: AuthService) {}

  ngOnInit(): void {
    console.log(this.isDonatoriSelected)
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    if (this.isDonatoriSelected) {
      // Chiamata per ottenere solo i donatori
      console.log("Donatori")
      this.subUtenti = this.dvbtSrv.getAllUtentiDonatori(page - 1, this.pageSizeD, "nome").subscribe((response: any) => {
        this.donatori = response['content'];
        this.totalPagesArrayD = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
                console.log(this.donatori)
      });
    } else {
      // Chiamata per ottenere tutti gli utenti
      console.log("Utenti")
      this.subUtenti = this.dvbtSrv.getAllUtenti(page - 1, this.pageSize, "nome").subscribe((response: any) => {
        this.utenti = response['content'];
        console.log(this.utenti)
        this.totalPagesArray = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
      });
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.loadPage(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }
  setPageSize(size: number): void {
    console.log(size)
    this.pageSize = size;
this.loadPage(1)
  }

  setPageD(page: number): void {
    this.currentPageD = page;
    this.loadPage(this.currentPageD);
  }

  nextPageD(): void {
    if (this.currentPageD < this.totalPagesArrayD.length) {
      this.currentPageD++;
      this.loadPage(this.currentPageD);
    }
  }

  previousPageD(): void {
    if (this.currentPageD > 1) {
      this.currentPageD--;
      this.loadPage(this.currentPageD);
    }
  }
  setPageSizeD(size: number): void {
    console.log(size)
    this.pageSizeD = size;
this.loadPage(1)
  }
  toggleDonatoriSelection(): void {
    console.log(this.isDonatoriSelected)
    this.currentPage = 1;
    this.loadPage(this.currentPage);
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
            this.loadPage(this.currentPage);
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
          this.loadPage(this.currentPage);

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
          this.loadPage(this.currentPage);

        }
      );
    }
    this.isUtenteEliminato = false;
  }

}


