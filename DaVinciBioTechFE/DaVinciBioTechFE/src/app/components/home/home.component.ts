import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  anno:string | undefined;
  scrollTop: number = 0;
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
    });

  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollTop = window.scrollY;
    console.log(this.scrollTop)
    if(window.scrollY>0 && window.scrollY<900){
      this.anno = '1452'
    }else if(window.scrollY>1000 && window.scrollY<1100){
      this.anno = '1466'
    }else if(window.scrollY>1200 && window.scrollY<1280){
      this.anno = '1482'
    }else if(window.scrollY>1344 && window.scrollY<1436){
      this.anno = '1498'
    }else if(window.scrollY>1523 && window.scrollY<1624){
      this.anno = '1503'
    }else if(window.scrollY>1712 && window.scrollY<1837){
      this.anno = '1513'
    }else if(window.scrollY>1896 && window.scrollY<2000){
      this.anno = '1516'
    }else if(window.scrollY>2200 && window.scrollY<2325){
      this.anno = '1570'
    }else if(window.scrollY>2400){
      this.anno = 'Oggi'
    }
  }

}


