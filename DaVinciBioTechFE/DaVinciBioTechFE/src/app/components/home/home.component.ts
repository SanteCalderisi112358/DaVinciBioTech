import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Utente } from 'src/app/models/utente.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { DvbtService } from 'src/app/services/dvbt.service';
import { Tavola } from 'src/app/models/tavola.interface';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit{

utente!: Utente;
  listFavorite: number[] = [];
  subTavole!: Subscription;
  tavole: Tavola[] = [];
  searching:boolean = false
  searchInput!: string;
  showSearchInput: boolean = false;
  tavolaCasuale: Tavola | undefined;
  isLoading:boolean = true;

  constructor(private dvbtSrv: DvbtService, private authSrv: AuthService) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      console.log(this.isLoading)
    }, 2000);
    console.log(this.isLoading)
    this.subTavole = this.dvbtSrv.getAllTavoleHome().subscribe((response) => {
      this.tavole = response;
      console.log(this.tavole);
      this.selezionaTavolaCasuale();
    });

  }


  selezionaTavolaCasuale(): void {
    // Genera un numero casuale tra 0 e la lunghezza dell'array delle tavole
    const numeroCasuale = Math.floor(Math.random() * this.tavole.length);

    // Seleziona la tavola casuale
    this.tavolaCasuale = this.tavole[numeroCasuale];
  }
}


