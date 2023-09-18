import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Data } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Donazione } from 'src/app/models/donazione.interface';
import { Tavola } from 'src/app/models/tavola.interface';
import { TavolaModifica } from 'src/app/models/tavolaModifica.interface';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';
import { UtenteNuovo } from 'src/app/models/utente-nuovo.interface';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteModificato } from 'src/app/models/utenteModifica.interface';
//import { AwsService } from 'src/app/services/aws.service';
import { DvbtService } from 'src/app/services/dvbt.service';
@Component({
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  /* VARIABILI GENERALI*/
  isErroreUguale:boolean = false;
  errore: string | undefined;
  errori:string[]=[];
  isModaleOpen:boolean=false;
  isLoading:boolean = true;


  /* VARIABILI UTENTI*/
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
  isUtenteCreato:boolean = false;
  isUtenteEliminato:boolean = false;
  donazioniDonatore:Donazione[]=[];
  isUtenteModificato:boolean = false;
  isUtenteUser:boolean = false;
  utenteModificato:UtenteModificato={
    email:"",
    nome:"",
    cognome:"",
    ruolo: TipoRuolo.USER,
  };
  utenteNuovo:UtenteNuovo={
    email:"",
    nome:"",
    cognome:"",
    password:"",
    ruolo: TipoRuolo.USER,
  };

  /*VARIABILI TAVOLE*/
  tavole:Tavola[]=[];
  tavola: Tavola ={
    id: "",
    titolo: "",
    descrizione: "",
    anno: 0,
    url:"",


    }
  idTavola:string | undefined;
  subTavole: Subscription | undefined;
  currentPageTavole:number = 1;
  pageSizeTavole: number = 5;
  totalElementsTavole:number=0;
  totalPagesArrayTavole: number[] = [];
  isTavolaEliminata:boolean = false;
  isTavolaModificata:boolean = false;
  tavolaModificata: TavolaModifica = {
    titolo:"",
    descrizione:"",
    anno:0,
    url:""
  }

    /*VARIABILI DONAZIONI*/
    donazione:Donazione | undefined;
    donazioni:Donazione[]=[];
    subDOnazioni:Subscription | undefined;
    dataDonazioni:string[]=[]
    annoDonazioni:string[]=[]
    meseDonazioni:string[]=[]
    currentPageDonazioni:number=1
    pageSizeDonazioni:number = 5
    areThereDonazioni: boolean = false;
    selectedMonthStart: string = '';
    selectedMonthEnd: string = '';
    selectedYear: string = '';
    dataInizio:string = '';
    dataFine:string ='';
    isErroreRicercaPeriodo:boolean | undefined;
    erroreRicercaPeriodo:string="";
    importoPerPeriodo!: number;
  constructor(private dvbtSrv: DvbtService, private authSrv: AuthService
    /*, private awsService: AwsService*/
    ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      console.log(this.isLoading)
    }, 2000);
    this.loadPageUtenti(this.currentPage);
    this.loadPageTavole(this.currentPageTavole);
    this.loadPageDonazioni(this.currentPageDonazioni)
    console.log("isErroreRicercaPeriodo: "+this.isErroreRicercaPeriodo)

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


 apriModaleOsservaTavola(tavola:Tavola){
  this.isModaleOpen = true;
  const modal = document.getElementById('tavola-eye');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.tavola = tavola;
      console.log(this.tavola)


    }


 }

 chiudiModaleOsservaTavola(){
  this.isModaleOpen = false;
  const modal = document.getElementById('tavola-eye');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';

  }
 }

 apriModaleModificaTavola(tavola:Tavola){
  const modal = document.getElementById('modaleModificaTavola');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.remove('modal-open');
     this.tavola = tavola;
  this.idTavola = tavola.id;
  console.log(this.tavola)
  console.log(this.idTavola)


  }
 }

modificaTavola(form: NgForm){
this.tavolaModificata.titolo = form.value.titolo
this.tavolaModificata.anno = form.value.anno
this.tavolaModificata.descrizione = form.value.descrizione
this.tavolaModificata.url = form.value.url
console.log("TAVOLA PRIMA DELLA MODIFICA"+this.tavola)
console.log("TAVOLA DOPO DELLA MODIFICA"+this.tavolaModificata)
console.log("isErroreUguale:"+this.isErroreUguale)
this.idTavola=this.tavola.id;
if(this.idTavola){
  this.dvbtSrv.putTavola(this.idTavola,this.tavolaModificata).subscribe(
  () => {
    console.log('Richiesta HTTP PUT inviata con successo');
    this.isTavolaModificata=true;
    console.log("Tavola Modificata?: "+this.isTavolaModificata)

  },
  (error:any) => {
    if(error.error.message==="Errore generico, risolveremo il prima possibile"){
      this.errore = "Sembra che tu abbia inserito un formato non valido. Per favore, verifica i dati inseriti e riprova."
      this.isErroreUguale=true;
      console.log(this.errore)
      console.log("IsErroreUguale: "+this.isErroreUguale)
    }else{
      this.errore = error.error.message;
      console.log(this.errore)
    }


  });
}



 }
 chiudiModaleModificaTavola(){
  this.isTavolaModificata=false;
  this.isErroreUguale = false;
  this.errore = "";
  const modal = document.getElementById('modaleModificaTavola');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    this.loadPageTavole(this.currentPage);


  }
 }

 apriModaleEliminaTavola(tavola:Tavola){
  const modal = document.getElementById('modaleDeleteTavola');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.remove('modal-open');
     this.tavola = tavola;
  this.idTavola = tavola.id;
  console.log(this.tavola)
  console.log(this.idTavola)
  }
 }
  deleteTavola(tavola:Tavola){
    this.tavola=tavola;
    console.log(this.tavola)
    if (this.idTavola) {
      this.dvbtSrv.deleteTavola(this.idTavola).subscribe(
        () => {
          console.log('Richiesta HTTP DELETE inviata con successo');
        },
        (error:any) => {
          this.errore = error.error.message;
          this.isTavolaEliminata = true;
          console.log(this.errore)
          this.loadPageTavole(this.currentPage);

        }
      );
    }
  }
 chiudiModaleEliminaTavola(){
  const modal = document.getElementById('modaleDeleteTavola');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.isTavolaEliminata = false;
    this.errore= "";
  }
 }

 apriModaleAggiungiUtente(){
  const modal = document.getElementById('modaleAggiungiUtente');
  console.log(this.errori)
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.remove('modal-open');

  }
 }

 creaUtente(form:NgForm){
  console.log(form.value);

  form.value.nome = this.utenteNuovo.nome;
  form.value.cognome = this.utenteNuovo.cognome;
  form.value.email = this.utenteNuovo.email;
  console.log(this.utenteNuovo)
   /* form.value.ruolo = TipoRuolo.ADMIN;
  }else{
    form.value.ruolo = TipoRuolo.USER;
   }*/
   this.dvbtSrv.postUtente(this.utenteNuovo).subscribe(
    () => {
      console.log('Richiesta HTTP POST inviata con successo');
      this.isUtenteCreato=true;
      console.log("Utente Creato?: "+this.isUtenteCreato)

    },
    (error:any) => {
console.log(error.error.errorsList)
this.errori = error.error.errorsList;
if(this.errori.length===0){
  console.log("Utente Creato?: "+this.isUtenteCreato)
  this.isUtenteCreato=false;
}




    });
   console.log(this.utenteNuovo)


 }

 chiudiModaleAggiungiUtente(){
  this.errori = [];
  this.isUtenteCreato = false;
  const modal = document.getElementById('modaleAggiungiUtente');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';

  }
 }

 /*caricaImmagine(event: any) {
  const file: File = event.target.files[0];
  const objectKey = `images/${file.name}`;
  this.awsService.uploadImage(file, objectKey)
    .then((imageUrl) => {
      console.log(imageUrl);
    })
    .catch((error) => {
      console.error(error);
    });
}*/
/* LOGICA DONAZIONI */

loadPageDonazioni(page: number): void {

  this.subDOnazioni=this.dvbtSrv.getAllDonazioniAdmin(page - 1, this.pageSizeDonazioni, "data").subscribe((response: any) => {
   this.donazioni = response['content'];
  /* this.totalPagesArrayTavole = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
    this.totalElementsTavole = response['totalElements']*/
   console.log("Donazioni")
   console.log(this.donazioni)
this.donazioni.forEach(don=>this.dataDonazioni.push(don.data))
console.log("Data donazioni:")
console.log(this.dataDonazioni)

  });

}


ricercaImportoPeriodo(){
  this.erroreRicercaPeriodo = "";
  console.log("errore: "+this.erroreRicercaPeriodo)
  this.importoPerPeriodo = 0;
    const meseSelect = document.getElementById('meseSelect') as HTMLSelectElement;
    const annoSelect = document.getElementById('annoSelect') as HTMLSelectElement;
  if (meseSelect.value === 'Seleziona Mese' &&  annoSelect.value=== 'Seleziona Anno') {
    this.erroreRicercaPeriodo = 'Si prega di selezionare mese e anno prima di effettuare la ricerca.';
  } else if (meseSelect.value === 'Seleziona Mese' &&  annoSelect.value!== 'Seleziona Anno') {
    this.erroreRicercaPeriodo = 'Si prega di selezionare un mese prima di effettuare la ricerca.';
  } else if ( meseSelect.value !== 'Seleziona Mese' &&  annoSelect.value=== 'Seleziona Anno') {
    this.erroreRicercaPeriodo = 'Si prega di selezionare un anno prima di effettuare la ricerca.';
  } else if(meseSelect.value !== 'Seleziona Mese' &&  annoSelect.value!== 'Seleziona Anno'){
    this.erroreRicercaPeriodo = '';
    switch (meseSelect.value) {
      case "1":
        this.selectedMonthStart = "01-01";
        this.selectedMonthEnd = "01-31";
        break;
      case "2":
        this.selectedMonthStart = "02-01";
        this.selectedMonthEnd = "02-28";
        break;
      case "3":
        this.selectedMonthStart = "03-01";
        this.selectedMonthEnd = "03-31";
        break;
      case "4":
        this.selectedMonthStart = "04-01";
        this.selectedMonthEnd = "04-30";
        break;
      case "5":
        this.selectedMonthStart = "05-01";
        this.selectedMonthEnd = "05-31";
        break;
      case "6":
        this.selectedMonthStart = "06-01";
        this.selectedMonthEnd = "06-30";
        break;
      case "7":
        this.selectedMonthStart = "07-01";
        this.selectedMonthEnd = "07-31";
        break;
      case "8":
        this.selectedMonthStart = "08-01";
        this.selectedMonthEnd = "08-31";
        break;
      case "9":
        this.selectedMonthStart = "09-01";
        this.selectedMonthEnd = "09-30";
        break;
      case "10":
        this.selectedMonthStart = "10-01";
        this.selectedMonthEnd = "10-31";
        break;
      case "11":
        this.selectedMonthStart = "11-01";
        this.selectedMonthEnd = "11-30";
        break;
      case "12":
        this.selectedMonthStart = "12-01";
        this.selectedMonthEnd = "12-31";
        break;
      default:
        this.selectedMonthStart = '';
        this.selectedMonthEnd = '';
        break;
    }

    switch(annoSelect.value){
      case "2020":
        this.selectedYear = "2020";
        break;
      case "2021":
        this.selectedYear = "2021";
        break;
      case "2022":
        this.selectedYear = "2022";
        break;
      case "2023":
        this.selectedYear = "2023";
        break;
      default:
          this.selectedYear = ""
    }

    this.dataInizio = this.selectedYear+"-"+this.selectedMonthStart
    this.dataFine = this.selectedYear+"-"+this.selectedMonthEnd
    console.log('Periodo mensile scelto: '+this.dataInizio+"-"+this.dataFine)
    this.dvbtSrv.getDonazioniPerPeriodo(this.dataInizio,this.dataFine).subscribe(
      (importo) => {
    this.importoPerPeriodo = importo;
    this.isErroreRicercaPeriodo = false;
      },
      (error:any) => {
        this.erroreRicercaPeriodo = error.error.message;
        this.isErroreRicercaPeriodo = true;
        console.log(this.erroreRicercaPeriodo)

      }
    );
    }


  }
}




