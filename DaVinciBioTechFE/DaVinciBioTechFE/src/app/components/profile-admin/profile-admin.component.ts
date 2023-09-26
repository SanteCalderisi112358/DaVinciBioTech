import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, catchError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Donazione } from 'src/app/models/donazione.interface';
import { Tavola } from 'src/app/models/tavola.interface';
import { TavolaModifica } from 'src/app/models/tavolaModifica.interface';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';
import { UtenteNuovo } from 'src/app/models/utente-nuovo.interface';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteModificato } from 'src/app/models/utente-modifica-from-admin.interface';
import { DvbtService } from 'src/app/services/dvbt.service';
import { NuovaTavola } from 'src/app/models/nuova-tavola.interface';
@Component({
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  /* VARIABILI GENERALI*/


  isErroreUguale: boolean = false;
  errore: string = "";
  errori: string[] = [];
  isModaleOpen: boolean = false;
  isLoading: boolean = true;
  chartOptions: any;

  /* VARIABILI UTENTI*/
  importoDonazioniAllUtentiMap: { [key: string]: number } = {};
  importoDonazioniDonatoriMap: { [key: string]: number } = {};
  subUtenti: Subscription | undefined;
  subDonazioni: Subscription | undefined;
  utenti: Utente[] = [];
  donatori: Utente[] = [];
  currentPage: number = 1;
  currentPageD: number = 1;
  totalPagesArray: number[] = [];
  totalPagesArrayD: number[] = []
  isDonatoriSelected: boolean = true;
  pageSize: number = 10;
  pageSizeD: number = 10;
  totalElementsUtenti: number = 0;
  totalElementsDonatori: number = 0;
  admin: Utente = {
    email: "",
    nome: "",
    cognome: "",
    ruolo: TipoRuolo.ADMIN,
    id: ""
  };
  utente: Utente = {
    email: "",
    nome: "",
    cognome: "",
    ruolo: TipoRuolo.USER,
    id: ""
  };
  idDonatore: string | undefined;
  isUtenteCreato: boolean = false;
  isUtenteEliminato: boolean = false;
  donazioniDonatore: Donazione[] = [];
  isUtenteModificato: boolean = false;
  isUtenteUser: boolean = false;
  utenteModificato: UtenteModificato = {
    email: "",
    nome: "",
    cognome: "",
    ruolo: TipoRuolo.USER,
  };
  nuovoUtenteRuolo: string = 'USER';
  utenteNuovo: UtenteNuovo = {
    email: "",
    nome: "",
    cognome: "",
    password: "",
    ruolo: TipoRuolo.USER,
  };
  /*VARIABILI TAVOLE*/
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = '';
  imageName: any;
  image: any;
  tavole: Tavola[] = [];
  tavola: Tavola = {
    id: "",
    titolo: "",
    descrizione: "",
    anno: 0,
    url: "",


  }
  idTavola: string | undefined;
  subTavole: Subscription | undefined;
  currentPageTavole: number = 1;
  pageSizeTavole: number = 5;
  totalElementsTavole: number = 0;
  totalPagesArrayTavole: number[] = [];
  isTavolaEliminata: boolean = false;
  isTavolaModificata: boolean = false;
  tavolaModificata!: TavolaModifica;

  nuovaTavola!: NuovaTavola;


  /*VARIABILI DONAZIONI*/
  importoDonazioni:number =0
  donazioniTotaleImporto: number = 0;
  donazione: Donazione | undefined;
  donazioni: Donazione[] = [];
  subDOnazioni: Subscription | undefined;
  dataDonazioni: string[] = []
  annoDonazioni: string[] = []
  meseDonazioni: string[] = []
  currentPageDonazioni: number = 1
  pageSizeDonazioni: number = 5
  areThereDonazioni: boolean = false;
  selectedMonthStart: string = '';
  selectedMonthEnd: string = '';
  selectedYear: string = '';
  dataInizio: string = '';
  dataFine: string = '';
  dataInizioCanvas: string = '';
  annoCanvas: string = ''
  dataFineCanvas: string = '';
  isErroreRicercaPeriodo: boolean | undefined;
  erroreRicercaPeriodo: string = "";
  erroreRicercaSelect: string = "";
  importoPerPeriodo!: number;
  erroreCanvas: string = ""
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
  importo_febbraio!: number;
  importo_marzo!: number;
  importo_aprile!: number;
  importo_maggio!: number;
  importo_giugno!: number;
  importo_luglio!: number;
  importo_agosto!: number;
  importo_settembre!: number;
  importo_ottobre!: number;
  importo_novembre!: number;
  importo_dicembre!: number;
  url!: string;

  constructor(private dvbtSrv: DvbtService, private authSrv: AuthService, private httpClient: HttpClient
    //, private awsService: AwsServiceSDK
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.loadPageUtenti(this.currentPage);
    this.loadPageTavole(this.currentPageTavole);
    this.loadPageDonazioni(this.currentPageDonazioni)
    this.loadImportoAllDOnazioni();


  }


  loadImportoAllDOnazioni(): void {
    this.dvbtSrv.getImportoAllDOnazioni().subscribe((importoTotale) => {
      this.donazioniTotaleImporto = importoTotale;
    })
  }
  loadPageUtenti(page: number): void {
    if (this.isDonatoriSelected) {
      // Chiamata per ottenere solo i donatori
      this.subUtenti = this.dvbtSrv.getAllUtentiDonatori(page - 1, this.pageSizeD, "cognome").subscribe((response: any) => {
        this.donatori = response['content'];
        this.totalPagesArrayD = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
        this.totalElementsDonatori = response['totalElements'];

        // Recupera l'importo delle donazioni per ciascun donatore
        this.donatori.forEach((donatore: any) => {
          this.getImportoDonazioniByDonatore(donatore.id);
        });
      });
    } else {
      // Chiamata per ottenere tutti gli utenti
      this.subUtenti = this.dvbtSrv.getAllUtenti(page - 1, this.pageSize, "cognome").subscribe((response: any) => {
        this.utenti = response['content'];
        this.totalPagesArray = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
        this.totalElementsUtenti = response['totalElements'];

        // Recupera l'importo delle donazioni per ciascun utente
        this.utenti.forEach((utente: any) => {
          this.getImportoDonazioniByUtente(utente.id);
        });
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

    this.pageSizeD = size;
    this.loadPageUtenti(1)
  }
  toggleDonatoriSelection(): void {
    this.currentPage = 1;
    this.loadPageUtenti(this.currentPage);
  }

  apriModaleDonatore(donatore: Utente) {
    this.isModaleOpen = true;
    this.authSrv.restore();
    const modal = document.getElementById('modaleDonatore');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.getDonazioniByIdUtente(donatore)


    }

  }
  getDonazioniByIdUtente(donatore: Utente) {
    this.idDonatore = donatore.id;
    if (!this.idDonatore) {
    } else {
      this.utente = donatore;

      this.subDonazioni = this.dvbtSrv.getAllDonazioniByIdUtente(this.idDonatore).subscribe(
        (response) => {
          this.donazioniDonatore = response;
        },
        (error: any) => {
          this.errore = error.error.message
        }
      );



    }
  }

  getImportoDonazioniByUtente(idUtente: string): void {
    if (!this.importoDonazioniAllUtentiMap[idUtente]) {
      this.dvbtSrv.getImportoDonazioniFromUser(idUtente).subscribe((importoDonazioni) => {
        this.importoDonazioniAllUtentiMap[idUtente] = importoDonazioni;
      });
    }
  }

  getImportoDonazioniByDonatore(idDonatore: string): void {
    if (!this.importoDonazioniDonatoriMap[idDonatore]) {
      this.dvbtSrv.getImportoDonazioniFromUser(idDonatore).subscribe((importoDonazioni) => {
        this.importoDonazioniDonatoriMap[idDonatore] = importoDonazioni;
      });
    }
  }
  highlightRow(importoDonazioni: number): string {
    return importoDonazioni !== 0 ? 'donatori' : 'non-donatori';
  }


  chiudiModaleDonatore(): void {
    this.isModaleOpen = false;
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
    this.idDonatore = utente.id;

    if (this.idDonatore) {
      this.dvbtSrv.deleteUtenteStepOne(this.idDonatore).subscribe(
        () => {
        },
        (error: any) => {
          this.errore = error.error.message;
          if (this.errore === `L'utente ${utente.nome} ${utente.cognome} ha eseguito delle donazioni. Vuoi eliminare anche le sue donazioni?`) {
            this.isErroreUguale = true;
            this.isUtenteEliminato = false;
          } else {
            this.loadPageUtenti(this.currentPage);
            this.loadImportoAllDOnazioni();
            this.isUtenteEliminato = true;
            this.isErroreUguale = true;
          }


        }
      );
    }

    this.isUtenteEliminato = false;


  }

  apriModaleEliminaUtente(utente: Utente) {
    this.isModaleOpen = true;
    this.utente = utente
    this.errore = ""
    const modal = document.getElementById('modaleDeleteUtente');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  chiudiModaleEliminaUtenti(): void {
    this.isModaleOpen = false;
    this.isErroreUguale = false;
    const modal = document.getElementById('modaleDeleteUtente');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';

    }
    this.errore = "";
    this.isUtenteEliminato = false;
  }


  deleteUtenteAndDonazioni(utente: Utente) {
    this.isUtenteEliminato = false;
    this.utente = utente;
    this.idDonatore = utente.id
    if (this.idDonatore) {
      this.dvbtSrv.deleteUtenteAndDonazioni(this.idDonatore).subscribe(
        () => {
        },
        (error: any) => {
          this.errore = error.error.message;
          this.isUtenteEliminato = true;
          this.loadPageUtenti(this.currentPage);
          this.loadImportoAllDOnazioni();
        }
      );
    }
    this.isUtenteEliminato = false;


  }


  deleteJustUtente(utente: Utente) {
    this.isUtenteEliminato = false;
    this.utente = utente;
    this.idDonatore = utente.id
    if (this.idDonatore) {
      this.dvbtSrv.deleteJustUtente(this.idDonatore).subscribe(
        () => {
        },
        (error: any) => {
          this.errore = error.error.message;
          this.isUtenteEliminato = true;
          this.loadPageUtenti(this.currentPage);
          this.loadImportoAllDOnazioni();
        }
      );
    }
    this.isUtenteEliminato = false;
  }

  apriModaleModificaUtente(utente: Utente) {
    this.isModaleOpen = true;
    this.utente = utente;
    const modal = document.getElementById('modaleModificaUtente');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      if (this.utente.ruolo === TipoRuolo.USER) {
        this.isUtenteUser = true;
      } else if (this.utente.ruolo === TipoRuolo.ADMIN) {
        this.isUtenteUser = false;

      }

    }

  }




  modificaUtente(form: NgForm) {
    this.utenteModificato.nome = form.value.nome;
    this.utenteModificato.cognome = form.value.cognome;
    this.utenteModificato.email = form.value.email;
    if (form.value.ruolo) {
      this.utenteModificato.ruolo = TipoRuolo.USER;
    } else {
      this.utenteModificato.ruolo = TipoRuolo.ADMIN;

    }
    this.idDonatore = this.utente.id;
    if (this.idDonatore) {
      this.dvbtSrv.putUtente(this.idDonatore, this.utenteModificato).subscribe(
        () => {
          this.isUtenteModificato = true;

        },
        (error: any) => {
          this.errore = error.error.message;

        }
      );
    }



  }

  chiudiModaleModificaUtente() {
    this.isModaleOpen = false;
    this.isUtenteModificato = false;

    const modal = document.getElementById('modaleModificaUtente');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isUtenteUser = false;
      this.isUtenteEliminato = false;
      this.loadPageUtenti(this.currentPage);


    }

  }
  /* LOGICA TAVOLE*/
  loadPageTavole(page: number): void {

    this.subTavole = this.dvbtSrv.getAllTavoleAdmin(page - 1, this.pageSizeTavole, "anno").subscribe((response: any) => {
      this.tavole = response['content'];
      this.totalPagesArrayTavole = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
      this.totalElementsTavole = response['totalElements']

    });

  }
  setPageSizeTavole(size: number): void {
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


  apriModaleOsservaTavola(tavola: Tavola) {
    this.isModaleOpen = true;
    const modal = document.getElementById('tavola-eye');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.tavola = tavola;


    }


  }

  chiudiModaleOsservaTavola() {
    this.isModaleOpen = false;
    const modal = document.getElementById('tavola-eye');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';

    }
  }

  apriModaleAggiungiTavola() {
    this.isModaleOpen = true;
    const modal = document.getElementById('modaleCreaTavola');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';

    }
  }



  onFileChanged(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];


      this.nuovaTavola.url = this.selectedFile;
    }
  }



  onUpload(form: NgForm) {
    const imageFormData = new FormData();
    const formData = new FormData();
    formData.append('url', this.nuovaTavola.url, this.nuovaTavola.url.name);
    formData.append('titolo', this.nuovaTavola.titolo);
    formData.append('anno', this.nuovaTavola.anno);
    formData.append('descrizione', this.nuovaTavola.descrizione);
    /*this.httpClient.post('http://localhost:8080/upload/image/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );*/
  }

  /*viewImage() {
    this.httpClient.get('http://localhost:8080/get/image/info/' + this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }*/
  chiudiModaleAggiungiTavola() {
    this.isModaleOpen = false;
    const modal = document.getElementById('modaleCreaTavola');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';

    }
  }

  apriModaleModificaTavola(tavola: Tavola) {
    this.isModaleOpen = true;
    const modal = document.getElementById('modaleModificaTavola');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.remove('modal-open');
      this.tavola = tavola;
      this.idTavola = tavola.id;



    }
  }

  modificaTavola(form: NgForm) {
    this.tavolaModificata.titolo = form.value.titolo
    this.tavolaModificata.anno = form.value.anno
    this.tavolaModificata.descrizione = form.value.descrizione
    this.tavolaModificata.url = form.value.url

    this.idTavola = this.tavola.id;
    if (this.idTavola) {
      this.dvbtSrv.putTavola(this.idTavola, this.tavolaModificata).subscribe(
        () => {
          this.isTavolaModificata = true;

        },
        (error: any) => {
          if (error.error.message === "Errore generico, risolveremo il prima possibile") {
            this.errore = "Sembra che tu abbia inserito un formato non valido. Per favore, verifica i dati inseriti e riprova."
            this.isErroreUguale = true;

          } else {
            this.errore = error.error.message;
          }


        });
    }



  }
  chiudiModaleModificaTavola() {
    this.isModaleOpen = false;
    this.isTavolaModificata = false;
    this.isErroreUguale = false;
    this.errore = "";
    const modal = document.getElementById('modaleModificaTavola');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.loadPageTavole(1);


    }
  }

  apriModaleEliminaTavola(tavola: Tavola) {
    this.isModaleOpen = true
    const modal = document.getElementById('modaleDeleteTavola');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.remove('modal-open');
      this.tavola = tavola;
      this.idTavola = tavola.id;

    }
  }
  deleteTavola(tavola: Tavola) {
    this.tavola = tavola;
    if (this.idTavola) {
      this.dvbtSrv.deleteTavola(this.idTavola).subscribe(
        () => {
        },
        (error: any) => {
          this.errore = error.error.message;
          this.isTavolaEliminata = true;
          this.loadPageTavole(this.currentPage);

        }
      );
    }
  }
  chiudiModaleEliminaTavola() {
    this.isModaleOpen = false
    const modal = document.getElementById('modaleDeleteTavola');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.isTavolaEliminata = false;
      this.errore = "";
    }
  }

  apriModaleAggiungiUtente() {
    this.isModaleOpen = true
    const modal = document.getElementById('modaleAggiungiUtente');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.remove('modal-open');

    }
  }

  creaUtente(form: NgForm) {
    this.isUtenteCreato = false;
    this.errore = "";
    this.errori = []
    this.utenteNuovo.nome = form.value.nome_nuovoUtente;
    this.utenteNuovo.cognome = form.value.cognome_nuovoUtente;
    this.utenteNuovo.email = form.value.email_nuovoUtente;
    this.utenteNuovo.password = form.value.password_nuovoUtente;
    if (form.value.ruolo_nuovoUtente === 'ADMIN') {
      this.utenteNuovo.ruolo = TipoRuolo.ADMIN
    } else if (form.value.ruolo_nuovoUtente === 'USER') {
      this.utenteNuovo.ruolo = TipoRuolo.USER

    }

    this.dvbtSrv.postUtente(this.utenteNuovo).subscribe(
      (nuovoUtenteCreato) => {
        if (nuovoUtenteCreato) {
          this.isUtenteCreato = true;
          this.errore = "";
          this.errori = [];
          this.loadPageUtenti(1)
          form.reset()
        }
      },
      (error: any) => {
        console.error(error)

        if (error.error.errorsList) {
          console.error(error.error.errorsList)
          this.errori = error.error.errorsList
          this.isUtenteCreato = false;
          form.reset()

        } else if (error.error.message) {
          this.errore = error.error.message
          this.isUtenteCreato = false;
          form.reset()

        }

      });


  }

  chiudiModaleAggiungiUtente() {
    this.isModaleOpen = false
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

    this.subDOnazioni = this.dvbtSrv.getAllDonazioniAdmin(page - 1, this.pageSizeDonazioni, "data").subscribe((response: any) => {
      this.donazioni = response['content'];
      /* this.totalPagesArrayTavole = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
        this.totalElementsTavole = response['totalElements']*/

      this.donazioni.forEach(don => this.dataDonazioni.push(don.data))


    });

  }


  ricercaImportoPeriodo() {
    this.erroreRicercaPeriodo = "";
    this.importoPerPeriodo = 0;
    const meseSelect = document.getElementById('meseSelect') as HTMLSelectElement;
    const annoSelect = document.getElementById('annoSelect') as HTMLSelectElement;
    if (meseSelect.value === 'Seleziona Mese' && annoSelect.value === 'Seleziona Anno') {
      this.erroreRicercaSelect = 'Si prega di selezionare mese e anno prima di effettuare la ricerca.';

    } else if (meseSelect.value === 'Seleziona Mese' && annoSelect.value !== 'Seleziona Anno') {
      this.erroreRicercaSelect = 'Si prega di selezionare un mese prima di effettuare la ricerca.';

    } else if (meseSelect.value !== 'Seleziona Mese' && annoSelect.value === 'Seleziona Anno') {
      this.erroreRicercaSelect = 'Si prega di selezionare un anno prima di effettuare la ricerca.';

    } else if (meseSelect.value !== 'Seleziona Mese' && annoSelect.value !== 'Seleziona Anno') {
      this.erroreRicercaSelect = '';

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

      switch (annoSelect.value) {
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

      this.dataInizio = this.selectedYear + "-" + this.selectedMonthStart
      this.dataFine = this.selectedYear + "-" + this.selectedMonthEnd
      console.log('Periodo mensile scelto: ' + this.dataInizio + "-" + this.dataFine)
      this.dvbtSrv.getDonazioniImportoPerPeriodo(this.dataInizio, this.dataFine).subscribe(
        (importo) => {
          this.importoPerPeriodo = importo;
          this.isErroreRicercaPeriodo = false;
        },
        (error: any) => {
          this.erroreRicercaPeriodo = error.error.message;
          this.isErroreRicercaPeriodo = true;
          console.log(this.erroreRicercaPeriodo)

        }
      );
    }

  }

  ricercaImportoPerAnno() {
    this.erroreCanvas = ''
    const annoSelect = document.getElementById('annoSelect_canvas') as HTMLSelectElement;
    console.log(annoSelect.value)
    if (annoSelect.value === 'Seleziona Anno') {
      this.erroreCanvas = 'Seleziona un anno per la tua ricerca';
    } else if (annoSelect.value !== 'Seleziona Anno') {
      this.erroreRicercaPeriodo = '';
      this.annoCanvas = annoSelect.value;
      this.dataInizioCanvas = this.annoCanvas + "-01-01"
      this.dataFineCanvas = this.annoCanvas + "-12-31"
      console.log("inizio periodo: " + this.dataInizioCanvas)
      console.log("inizio periodo: " + this.dataFineCanvas)
      this.gennaioInizio = this.annoCanvas + "-01-01"
      this.gennaioFine = this.annoCanvas + "-01-31"
      this.febbraioInizio = this.annoCanvas + "-02-01"
      this.febbraioFine = this.annoCanvas + "-02-28"
      this.marzoInizio = this.annoCanvas + "-03-01"
      this.marzoFine = this.annoCanvas + "-03-31"
      this.aprileInizio = this.annoCanvas + "-04-01"
      this.aprileFine = this.annoCanvas + "-04-30"
      this.maggioInizio = this.annoCanvas + "-05-01"
      this.maggioFine = this.annoCanvas + "-05-31"
      this.giugnoInizio = this.annoCanvas + "-06-01"
      this.giugnoFine = this.annoCanvas + "-06-30"
      this.luglioInizio = this.annoCanvas + "-07-01"
      this.luglioFine = this.annoCanvas + "-07-31"
      this.agostoInizio = this.annoCanvas + "-08-01"
      this.agostoFine = this.annoCanvas + "-08-31"
      this.settembreInizio = this.annoCanvas + "-09-01"
      this.settembreFine = this.annoCanvas + "-09-30"
      this.ottobreInizio = this.annoCanvas + "-10-01"
      this.ottobreFine = this.annoCanvas + "-10-31"
      this.novembreInizio = this.annoCanvas + "-11-01"
      this.novembreFine = this.annoCanvas + "-11-30"
      this.dicembreInizio = this.annoCanvas + "-12-01"
      this.dicembreFine = this.annoCanvas + "-12-31"

      /*Gennaio*/
      this.dvbtSrv.getDonazioniImportoPerPeriodo(this.gennaioInizio, this.gennaioFine).subscribe(
        (importo) => {
          this.importo_gennaio = importo;
          console.log(this.importo_gennaio)

        },
        (error: any) => {
          console.error(error.error.message)
          if (error.error.message === 'Tra il ' + this.gennaioInizio + ' e il ' + this.gennaioFine + ' non ci sono state donazioni!') {
            this.importo_gennaio = 0;
            console.log(this.importo_gennaio)
          }

        }
      );
    }
    /*febbraio*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.febbraioInizio, this.febbraioFine).subscribe(
      (importo) => {
        this.importo_febbraio = importo;
        console.log(this.importo_febbraio)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.febbraioInizio + ' e il ' + this.febbraioFine + ' non ci sono state donazioni!') {
          this.importo_febbraio = 0;
          console.log(this.importo_febbraio)
        }

      }
    );

    /*marzo*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.marzoInizio, this.marzoFine).subscribe(
      (importo) => {
        this.importo_marzo = importo;
        console.log(this.importo_marzo)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.marzoInizio + ' e il ' + this.marzoFine + ' non ci sono state donazioni!') {
          this.importo_marzo = 0;
          console.log(this.importo_marzo)
        }

      }
    );

    /*aprile*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.aprileInizio, this.aprileFine).subscribe(
      (importo) => {
        this.importo_aprile = importo;
        console.log(this.importo_aprile)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.aprileInizio + ' e il ' + this.aprileFine + ' non ci sono state donazioni!') {
          this.importo_aprile = 0;
          console.log(this.importo_aprile)
        }

      }
    );

    /*maggio*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.maggioInizio, this.maggioFine).subscribe(
      (importo) => {
        this.importo_maggio = importo;
        console.log(this.importo_maggio)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.maggioInizio + ' e il ' + this.maggioFine + ' non ci sono state donazioni!') {
          this.importo_maggio = 0;
          console.log(this.importo_maggio)
        }

      }
    );

    /*giugno*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.giugnoInizio, this.giugnoFine).subscribe(
      (importo) => {
        this.importo_giugno = importo;
        console.log(this.importo_giugno)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.giugnoInizio + ' e il ' + this.giugnoFine + ' non ci sono state donazioni!') {
          this.importo_giugno = 0;
          console.log(this.importo_giugno)
        }

      }
    );

    /*luglio*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.luglioInizio, this.luglioFine).subscribe(
      (importo) => {
        this.importo_luglio = importo;
        console.log(this.importo_luglio)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.luglioInizio + ' e il ' + this.luglioFine + ' non ci sono state donazioni!') {
          this.importo_luglio = 0;
          console.log(this.importo_luglio)
        }

      }
    );

    /*agosto*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.agostoInizio, this.agostoFine).subscribe(
      (importo) => {
        this.importo_agosto = importo;
        console.log(this.importo_agosto)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.agostoInizio + ' e il ' + this.agostoFine + ' non ci sono state donazioni!') {
          this.importo_agosto = 0;
          console.log(this.importo_agosto)
        }

      }
    );

    /*settembre*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.settembreInizio, this.settembreFine).subscribe(
      (importo) => {
        this.importo_settembre = importo;
        console.log("Settembre: " + this.importo_settembre)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.settembreInizio + ' e il ' + this.settembreFine + ' non ci sono state donazioni!') {
          this.importo_settembre = 0;
          console.log("Settembre: " + this.importo_settembre)
        }

      }
    );

    /*ottobre*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.ottobreInizio, this.ottobreFine).subscribe(
      (importo) => {
        this.importo_ottobre = importo;
        console.log(this.importo_ottobre)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.ottobreInizio + ' e il ' + this.ottobreFine + ' non ci sono state donazioni!') {
          this.importo_ottobre = 0;
          console.log(this.importo_ottobre)
        }

      }
    );

    /*novembre*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.novembreInizio, this.novembreFine).subscribe(
      (importo) => {
        this.importo_novembre = importo;
        console.log(this.importo_novembre)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.novembreInizio + ' e il ' + this.novembreFine + ' non ci sono state donazioni!') {
          this.importo_novembre = 0;
          console.log(this.importo_novembre)
        }

      }
    );
    /*dicembre*/
    this.dvbtSrv.getDonazioniImportoPerPeriodo(this.dicembreInizio, this.dicembreFine).subscribe(
      (importo) => {
        this.importo_dicembre = importo;
        console.log(this.importo_dicembre)

      },
      (error: any) => {
        console.error(error.error.message)
        if (error.error.message === 'Tra il ' + this.dicembreInizio + ' e il ' + this.dicembreFine + ' non ci sono state donazioni!') {
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
          { label: "Gennaio", y: this.importo_gennaio },
          { label: "Febbraio", y: this.importo_febbraio },
          { label: "Marzo", y: this.importo_marzo },
          { label: "Aprile", y: this.importo_aprile },
          { label: "Maggio", y: this.importo_maggio },
          { label: "Giugno", y: this.importo_giugno },
          { label: "Luglio", y: this.importo_luglio },
          { label: "Agosto", y: this.importo_agosto },
          { label: "Settembre", y: this.importo_settembre },
          { label: "Ottobre", y: this.importo_ottobre },
          { label: "Novembre", y: this.importo_novembre },
          { label: "Dicembre", y: this.importo_dicembre },

        ]
      }]
    };

  }



}













