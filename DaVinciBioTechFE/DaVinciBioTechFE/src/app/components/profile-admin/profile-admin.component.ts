import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Data } from '@angular/router';
import { ChartAxisLabelOptions } from 'aws-sdk/clients/quicksight';
import { Subscription, catchError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Donazione } from 'src/app/models/donazione.interface';
import { Tavola } from 'src/app/models/tavola.interface';
import { TavolaModifica } from 'src/app/models/tavolaModifica.interface';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';
import { UtenteNuovo } from 'src/app/models/utente-nuovo.interface';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteModificato } from 'src/app/models/utenteModifica.interface';
import { AwsService } from 'src/app/services/aws.service';
import { DvbtService } from 'src/app/services/dvbt.service';
@Component({
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  /* VARIABILI GENERALI*/


  isErroreUguale:boolean = false;
  errore: string = "";
  errori:string[]=[];
  isModaleOpen:boolean=false;
  isLoading:boolean = true;
  chartOptions:any;

  /* VARIABILI UTENTI*/
  subUtenti: Subscription | undefined;
  subDonazioni: Subscription | undefined;
  utenti: Utente[] = [];
  donatori:Utente[]=[];
  currentPage: number = 1;
  currentPageD: number = 1;
  totalPagesArray: number[] = [];
  totalPagesArrayD:number[] =[]
  isDonatoriSelected: boolean = true;
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
  nuovoUtenteRuolo:string = 'USER';
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
    donazioniTotaleImporto:number=0;
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
    dataInizioCanvas:string = '';
    annoCanvas:string = ''
    dataFineCanvas: string = '';
    isErroreRicercaPeriodo:boolean | undefined;
    erroreRicercaPeriodo:string="";
    erroreRicercaSelect:string ="";
    importoPerPeriodo!: number;
    erroreCanvas:string =""
    gennaioInizio: string = ""
    gennaioFine: string = ""
    febbraioInizio: string = ""
    febbraioFine: string = ""
    marzoInizio: string = ""
    marzoFine: string = ""
    aprileInizio: string = ""
    aprileFine: string = ""
    maggioInizio: string = ""
    maggioFine: string = ""
    giugnoInizio: string = ""
    giugnoFine: string = ""
    luglioInizio: string = ""
    luglioFine: string = ""
    agostoInizio: string = ""
    agostoFine: string = ""
    settembreInizio: string = ""
    settembreFine: string = ""
    ottobreInizio: string = ""
    ottobreFine: string = ""
    novembreInizio: string = ""
    novembreFine: string = ""
    dicembreInizio: string = ""
    dicembreFine: string = ""
    importo_gennaio!: number;
    importo_febbraio!:number;
    importo_marzo!:number;
    importo_aprile!:number;
    importo_maggio!:number;
    importo_giugno!:number;
    importo_luglio!:number;
    importo_agosto!:number;
    importo_settembre!:number;
    importo_ottobre!:number;
    importo_novembre!:number;
    importo_dicembre!:number;

  constructor(private dvbtSrv: DvbtService, private authSrv: AuthService
    , private awsService: AwsService
    ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      console.log(this.isLoading)
    }, 2000);
    this.loadPageUtenti(this.currentPage);
    this.loadPageTavole(this.currentPageTavole);
    this.loadPageDonazioni(this.currentPageDonazioni)
    this.loadImportoAllDOnazioni();
    console.log("isUtenteCreato: "+this.isUtenteCreato)
    console.log("errori: "+this.errori)
    console.log("errore: "+this.errore)


  }


  loadImportoAllDOnazioni():void{
    this.dvbtSrv.getImportoAllDOnazioni().subscribe((importoTotale)=>{
this.donazioniTotaleImporto = importoTotale;
    })
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
    this.isModaleOpen = true;
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
    this.isModaleOpen=false;
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
            this.loadImportoAllDOnazioni();
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
  this.isModaleOpen=true;
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
    this.isModaleOpen=false;
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
          this.loadImportoAllDOnazioni();
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
          this.loadImportoAllDOnazioni();
        }
      );
    }
    this.isUtenteEliminato = false;
  }

  apriModaleModificaUtente(utente:Utente){
    this.isModaleOpen=true;
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
    this.isModaleOpen=false;
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
  this.isModaleOpen=true;
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
  this.isModaleOpen=false;
  this.isTavolaModificata=false;
  this.isErroreUguale = false;
  this.errore = "";
  const modal = document.getElementById('modaleModificaTavola');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    this.loadPageTavole(1);


  }
 }

 apriModaleEliminaTavola(tavola:Tavola){
  this.isModaleOpen=true
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
  this.isModaleOpen=false
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
  this.isModaleOpen=true
  const modal = document.getElementById('modaleAggiungiUtente');
  console.log(this.errori)
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.remove('modal-open');

  }
 }

 creaUtente(form:NgForm){
  this.isUtenteCreato = false;
this.errore = "";
this.errori = []
  this.utenteNuovo.nome = form.value.nome_nuovoUtente;
  this.utenteNuovo.cognome = form.value.cognome_nuovoUtente;
  this.utenteNuovo.email = form.value.email_nuovoUtente;
  this.utenteNuovo.password = form.value.password_nuovoUtente;
if(form.value.ruolo_nuovoUtente === 'ADMIN'){
  this.utenteNuovo.ruolo = TipoRuolo.ADMIN
}else if(form.value.ruolo_nuovoUtente === 'USER'){
  this.utenteNuovo.ruolo = TipoRuolo.USER

}

  this.dvbtSrv.postUtente(this.utenteNuovo).subscribe(
    (nuovoUtenteCreato) => {
      if(nuovoUtenteCreato){
       console.log('Richiesta HTTP POST inviata con successo');
      this.isUtenteCreato=true;
      this.errore = "";
      this.errori = [];
      console.log("Utente Creato?: "+this.isUtenteCreato)
      this.loadPageUtenti(1)
      form.reset()
      }
      },
    (error:any) => {
console.error(error)

      if(error.error.errorsList){
        console.error(error.error.errorsList)
        this.errori = error.error.errorsList
        this.isUtenteCreato = false;
        form.reset()

      }else if(error.error.message){
        console.log(error.error.message)
        this.errore = error.error.message
        this.isUtenteCreato = false;
        form.reset()

      }

    });

    console.log("Dati nuovoUtente: ")
   console.log(this.utenteNuovo)


 }

 chiudiModaleAggiungiUtente(){
  this.isModaleOpen=false
  this.errori = [];
  this.isUtenteCreato = false;
  const modal = document.getElementById('modaleAggiungiUtente');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';

  }
 }

 caricaImmagine(event: any) {
  const file: File = event.target.files[0];
  const objectKey = `images/${file.name}`;
  this.awsService.uploadImage(file, objectKey)
    .then((imageUrl) => {
      console.log(imageUrl);
    })
    .catch((error) => {
      console.error(error);
    });
}
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
    this.erroreRicercaSelect = 'Si prega di selezionare mese e anno prima di effettuare la ricerca.';
    console.log(this.erroreRicercaSelect)
  } else if (meseSelect.value === 'Seleziona Mese' &&  annoSelect.value!== 'Seleziona Anno') {
    this.erroreRicercaSelect = 'Si prega di selezionare un mese prima di effettuare la ricerca.';
    console.log(this.erroreRicercaSelect)
  } else if ( meseSelect.value !== 'Seleziona Mese' &&  annoSelect.value=== 'Seleziona Anno') {
    this.erroreRicercaSelect = 'Si prega di selezionare un anno prima di effettuare la ricerca.';
    console.log(this.erroreRicercaSelect)
  } else if(meseSelect.value !== 'Seleziona Mese' &&  annoSelect.value!== 'Seleziona Anno'){
    this.erroreRicercaSelect = '';
  console.log(this.erroreRicercaSelect)
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
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.dataInizio,this.dataFine).subscribe(
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

  ricercaImportoPerAnno(){
    this.erroreCanvas = ''
    const annoSelect = document.getElementById('annoSelect_canvas') as HTMLSelectElement;
    console.log(annoSelect.value)
    if(annoSelect.value === 'Seleziona Anno'){
      this.erroreCanvas = 'Seleziona un anno per la tua ricerca';
    }else if(annoSelect.value!=='Seleziona Anno'){
      this.erroreRicercaPeriodo = '';
      this.annoCanvas = annoSelect.value;
      this.dataInizioCanvas = this.annoCanvas+"-01-01"
      this.dataFineCanvas = this.annoCanvas+"-12-31"
      console.log("inizio periodo: "+this.dataInizioCanvas)
      console.log("inizio periodo: "+this.dataFineCanvas)
      this.gennaioInizio = this.annoCanvas+"-01-01"
      this.gennaioFine = this.annoCanvas+"-01-31"
      this.febbraioInizio = this.annoCanvas+"-02-01"
      this.febbraioFine = this.annoCanvas+"-02-28"
      this.marzoInizio = this.annoCanvas+"-03-01"
      this.marzoFine = this.annoCanvas+"-03-31"
      this.aprileInizio = this.annoCanvas+"-04-01"
      this.aprileFine = this.annoCanvas+"-04-30"
      this.maggioInizio = this.annoCanvas+"-05-01"
      this.maggioFine = this.annoCanvas+"-05-31"
      this.giugnoInizio = this.annoCanvas+"-06-01"
      this.giugnoFine = this.annoCanvas+"-06-30"
      this.luglioInizio = this.annoCanvas+"-07-01"
      this.luglioFine = this.annoCanvas+"-07-31"
      this.agostoInizio = this.annoCanvas+"-08-01"
      this.agostoFine = this.annoCanvas+"-08-31"
      this.settembreInizio = this.annoCanvas+"-09-01"
      this.settembreFine = this.annoCanvas+"-09-30"
      this.ottobreInizio = this.annoCanvas+"-10-01"
      this.ottobreFine = this.annoCanvas+"-10-31"
      this.novembreInizio = this.annoCanvas+"-11-01"
      this.novembreFine = this.annoCanvas+"-11-30"
      this.dicembreInizio = this.annoCanvas+"-12-01"
      this.dicembreFine = this.annoCanvas+"-12-31"

/*Gennaio*/
      this.dvbtSrv.getDonazioniImportoPerPeriodo(this.gennaioInizio,this.gennaioFine).subscribe(
        (importo) => {
      this.importo_gennaio = importo;
      console.log(this.importo_gennaio)

        },
        (error:any) => {
          console.error(error.error.message)
          if(error.error.message === 'Tra il '+this.gennaioInizio+' e il '+this.gennaioFine+' non ci sono state donazioni!'){
            this.importo_gennaio = 0;
            console.log(this.importo_gennaio)
          }

        }
      );
      }
/*febbraio*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.febbraioInizio,this.febbraioFine).subscribe(
  (importo) => {
this.importo_febbraio = importo;
console.log(this.importo_febbraio)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.febbraioInizio+' e il '+this.febbraioFine+' non ci sono state donazioni!'){
      this.importo_febbraio = 0;
      console.log(this.importo_febbraio)
    }

  }
);

/*marzo*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.marzoInizio,this.marzoFine).subscribe(
  (importo) => {
this.importo_marzo = importo;
console.log(this.importo_marzo)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.marzoInizio+' e il '+this.marzoFine+' non ci sono state donazioni!'){
      this.importo_marzo = 0;
      console.log(this.importo_marzo)
    }

  }
);

/*aprile*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.aprileInizio,this.aprileFine).subscribe(
  (importo) => {
this.importo_aprile = importo;
console.log(this.importo_aprile)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.aprileInizio+' e il '+this.aprileFine+' non ci sono state donazioni!'){
      this.importo_aprile= 0;
      console.log(this.importo_aprile)
    }

  }
);

/*maggio*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.maggioInizio,this.maggioFine).subscribe(
  (importo) => {
this.importo_maggio = importo;
console.log(this.importo_maggio)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.maggioInizio+' e il '+this.maggioFine+' non ci sono state donazioni!'){
      this.importo_maggio = 0;
      console.log(this.importo_maggio)
    }

  }
);

/*giugno*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.giugnoInizio,this.giugnoFine).subscribe(
  (importo) => {
this.importo_giugno = importo;
console.log(this.importo_giugno)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.giugnoInizio+' e il '+this.giugnoFine+' non ci sono state donazioni!'){
      this.importo_giugno = 0;
      console.log(this.importo_giugno)
    }

  }
);

/*luglio*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.luglioInizio,this.luglioFine).subscribe(
  (importo) => {
this.importo_luglio = importo;
console.log(this.importo_luglio)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.luglioInizio+' e il '+this.luglioFine+' non ci sono state donazioni!'){
      this.importo_luglio = 0;
      console.log(this.importo_luglio)
    }

  }
);

/*agosto*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.agostoInizio,this.agostoFine).subscribe(
  (importo) => {
this.importo_agosto = importo;
console.log(this.importo_agosto)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.agostoInizio+' e il '+this.agostoFine+' non ci sono state donazioni!'){
      this.importo_agosto= 0;
      console.log(this.importo_agosto)
    }

  }
);

/*settembre*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.settembreInizio,this.settembreFine).subscribe(
  (importo) => {
this.importo_settembre = importo;
console.log("Settembre: "+this.importo_settembre)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.settembreInizio+' e il '+this.settembreFine+' non ci sono state donazioni!'){
      this.importo_settembre = 0;
      console.log("Settembre: "+this.importo_settembre)
    }

  }
);

/*ottobre*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.ottobreInizio,this.ottobreFine).subscribe(
  (importo) => {
this.importo_ottobre = importo;
console.log(this.importo_ottobre)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.ottobreInizio+' e il '+this.ottobreFine+' non ci sono state donazioni!'){
      this.importo_ottobre = 0;
      console.log(this.importo_ottobre)
    }

  }
);

/*novembre*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.novembreInizio,this.novembreFine).subscribe(
  (importo) => {
this.importo_novembre = importo;
console.log(this.importo_novembre)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.novembreInizio+' e il '+this.novembreFine+' non ci sono state donazioni!'){
      this.importo_novembre = 0;
      console.log(this.importo_novembre)
    }

  }
);
/*dicembre*/
this.dvbtSrv.getDonazioniImportoPerPeriodo(this.dicembreInizio,this.dicembreFine).subscribe(
  (importo) => {
this.importo_dicembre = importo;
console.log(this.importo_dicembre)

  },
  (error:any) => {
    console.error(error.error.message)
    if(error.error.message === 'Tra il '+this.dicembreInizio+' e il '+this.dicembreFine+' non ci sono state donazioni!'){
      this.importo_dicembre = 0;
      console.log(this.importo_dicembre)
    }

  }
);



this.chartOptions = {
    title: {
      text: "Donazioni ricevute"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Gennaio",  y: this.importo_gennaio  },
        { label: "Febbraio", y: this.importo_febbraio  },
        { label: "Marzo", y: this.importo_marzo  },
        { label: "Aprile",  y: this.importo_aprile  },
        { label: "Maggio",  y: this.importo_maggio  },
        { label: "Giugno",  y: this.importo_giugno  },
        { label: "Luglio",  y: this.importo_luglio  },
        { label: "Agosto",  y: this.importo_agosto  },
        { label: "Settembre",  y: this.importo_settembre },
        { label: "Ottobre",  y: this.importo_ottobre  },
        { label: "Novembre",  y: this.importo_novembre  },
        { label: "Dicembre",  y: this.importo_dicembre  },

      ]
    }]
  };

}



}













