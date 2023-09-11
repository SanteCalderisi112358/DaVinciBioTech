import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utente } from 'src/app/models/utente.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { TavolaService } from 'src/app/services/tavole.service';
import { Tavola } from 'src/app/models/tavola.interface';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

utente!: Utente;
  listFavorite: number[] = [];
  subTavole!: Subscription;
  tavole!: Tavola[];
  searching:boolean = false
  searchInput!: string;
  showSearchInput: boolean = false;

  constructor(private tavolaSrv: TavolaService, private authSrv: AuthService) { }


  ngOnInit(): void {
    this.subTavole = this.tavolaSrv.getAllTavole(0,11).subscribe((response) => {
      this.tavole = response;
      console.log(this.tavole);
    });
  }
  ngOnDestroy(): void {

    if (this.subTavole) {
      this.subTavole.unsubscribe();
    }

  }


}




