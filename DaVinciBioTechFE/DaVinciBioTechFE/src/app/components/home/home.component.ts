import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utente } from 'src/app/models/utente.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { DvbtService } from 'src/app/services/dvbt.service';
import { Tavola } from 'src/app/models/tavola.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit, OnDestroy {

utente!: Utente;
  listFavorite: number[] = [];
  subTavole!: Subscription;
  tavole: Tavola[] = [];
  searching:boolean = false
  searchInput!: string;
  showSearchInput: boolean = false;
  tavolaCasuale: Tavola | undefined;


  constructor(private dvbtSrv: DvbtService, private authSrv: AuthService) { }


  ngOnInit(): void {
    this.subTavole = this.dvbtSrv.getAllTavole().subscribe((response) => {
      this.tavole = response;
      console.log(this.tavole);
      this.selezionaTavolaCasuale();
    });

  }
  ngOnDestroy(): void {

    if (this.subTavole) {
      this.subTavole.unsubscribe();
    }

  }

  selezionaTavolaCasuale(): void {
    // Genera un numero casuale tra 0 e la lunghezza dell'array delle tavole
    const numeroCasuale = Math.floor(Math.random() * this.tavole.length);

    // Seleziona la tavola casuale
    this.tavolaCasuale = this.tavole[numeroCasuale];
  }
}

