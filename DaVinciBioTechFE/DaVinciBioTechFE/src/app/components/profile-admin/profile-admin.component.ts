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
import { Subscription } from 'rxjs';
import { Donazione } from 'src/app/models/donazione.interface';
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
  isDonatoriSelected: boolean = false; // Aggiungi questa variabile
  pageSize: number = 10;
  pageSizeD: number = 10;
  donatore:Utente | undefined;
  idDonatore:string | undefined;
  isModaleDonatore:boolean=false;
  donazioniDonatore:Donazione[]=[];
  constructor(private dvbtSrv: DvbtService) {}

  ngOnInit(): void {
    console.log(this.isDonatoriSelected)
    this.loadPage(this.currentPage);
    console.log("isModaleDonatore: "+this.isModaleDonatore)
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
    this.isModaleDonatore=true;
    console.log("isModaleDonatore: "+this.isModaleDonatore)
    this.idDonatore = donatore.id;
    if(!this.idDonatore){
    console.log("Non esiste questo id")
  }else{
  this.donatore = donatore;
  console.log(this.donatore)
  this.subDonazioni = this.dvbtSrv.getAllDonazioniByIdUtente(this.idDonatore).subscribe((response) => {
  this.donazioniDonatore = response;
  console.log(this.donazioniDonatore)
});
}

  }

  chiudiModaleDonatore(){
    this.isModaleDonatore=false;
  }
}


