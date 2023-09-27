import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Subscription} from 'rxjs';
import { Utente } from 'src/app/models/utente.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { DvbtService } from 'src/app/services/dvbt.service';
import { Tavola } from 'src/app/models/tavola.interface';
import { Console } from 'console';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],


})
export class HomeComponent implements OnInit{
  @ViewChild('hero') hero!: ElementRef;
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
  scrollTop: number = window.scrollY;
   constructor(private dvbtSrv: DvbtService, private authSrv: AuthService) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.subTavole = this.dvbtSrv.getAllTavoleHome().subscribe((response) => {
      this.tavole = response;
    });

  }


  @HostListener('window:scroll', ['$event'])
  onScrollHero(event: Event): void {
    const scrollPosition = window.scrollY;
    const backgroundSize = `cover ${100 + scrollPosition / 5}%`;
    const hero = document.getElementById('hero');

  }
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    console.log(window.scrollY)
    const hero = document.getElementById('hero');
    const vetruvio = document.getElementById('vetruvio') as HTMLElement

    if(vetruvio){
      console.log(vetruvio)
      vetruvio.style.top = `${-window.scrollY / 5.5}px`
    }
    if (hero) {
      const backgroundSize = `${((window.scrollY + 1) / 50) + 100}%`;
      hero.style.backgroundSize = backgroundSize;
    }
    if(window.scrollY>0 && window.scrollY<1050){
      document.getElementById('1452')?.classList.remove('hidden');
      document.getElementById('1452')?.classList.add('animationLife');
      this.anno = '1452'
    }else if(window.scrollY>1100 && window.scrollY<1300){
      document.getElementById('1466')?.classList.remove('hidden');
      document.getElementById('1466')?.classList.add('animationLife');
      this.anno = '1466'
    }else if(window.scrollY>1350 && window.scrollY<1550){
      document.getElementById('1482')?.classList.remove('hidden');
      document.getElementById('1482')?.classList.add('animationLife');
      this.anno = '1482'
    }else if(window.scrollY>1600 && window.scrollY<1800){
      document.getElementById('1498')?.classList.remove('hidden');
      document.getElementById('1498')?.classList.add('animationLife');
      document.getElementById('cenacolo')?.classList.remove('hidden');
      document.getElementById('cenacolo')?.classList.add('animationLife');
      this.anno = '1498'
    }else if(window.scrollY>1850 && window.scrollY<2050){
      document.getElementById('gioconda')?.classList.remove('hidden');
      document.getElementById('gioconda')?.classList.add('animationLife');
      document.getElementById('1503')?.classList.remove('hidden');
      document.getElementById('1503')?.classList.add('animationLife');
      this.anno = '1503'
    }else if(window.scrollY>2100 && window.scrollY<2300){
      document.getElementById('1513')?.classList.remove('hidden');
      document.getElementById('1513')?.classList.add('animationLife');
      this.anno = '1513'
    }else if(window.scrollY>2350 && window.scrollY<2500){
      document.getElementById('1516')?.classList.remove('hidden');
      document.getElementById('1516')?.classList.add('animationLife');
      this.anno = '1516'
    }else if(window.scrollY>2550 && window.scrollY<2750){
      document.getElementById('uomo_vetruviano')?.classList.remove('hidden');
      document.getElementById('uomo_vetruviano')?.classList.add('animationLife');
      document.getElementById('1570')?.classList.remove('hidden');
      document.getElementById('1570')?.classList.add('animationLife');
      this.anno = '1570'
    }else if(window.scrollY>2800){
      document.getElementById('oggi')?.classList.remove('hidden');
      document.getElementById('oggi')?.classList.add('animationLife');
      this.anno = 'Oggi'
    }
  }

}


