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
      console.log(this.isLoading)
    }, 2000);
    console.log(this.isLoading)
    this.subTavole = this.dvbtSrv.getAllTavoleHome().subscribe((response) => {
      this.tavole = response;
      console.log(this.tavole);
    });

  }
  @HostListener('window:scroll', ['$event'])
  onScrollHero(event: Event): void {
    const scrollPosition = window.scrollY;
    const backgroundSize = `cover ${100 + scrollPosition / 5}%`;
    const hero = document.getElementById('hero');
    console.log(backgroundSize)
    console.log(scrollPosition)
    if(hero){
      console.log("Hero:")
    console.log(this.hero)
    }

  }
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const hero = document.getElementById('hero');
    if (hero) {
      const backgroundSize = `${((window.scrollY + 1) / 50) + 100}%`;
      hero.style.backgroundSize = backgroundSize;
      console.log(backgroundSize)
    }
    if(window.scrollY>0 && window.scrollY<900){
      document.getElementById('1452')?.classList.remove('hidden');
      document.getElementById('1452')?.classList.add('animationLife');
      this.anno = '1452'
    }else if(window.scrollY>1000 && window.scrollY<1100){
      document.getElementById('1466')?.classList.remove('hidden');
      document.getElementById('1466')?.classList.add('animationLife');
      this.anno = '1466'
    }else if(window.scrollY>1200 && window.scrollY<1280){
      document.getElementById('1482')?.classList.remove('hidden');
      document.getElementById('1482')?.classList.add('animationLife');
      this.anno = '1482'
    }else if(window.scrollY>1344 && window.scrollY<1436){
      document.getElementById('1498')?.classList.remove('hidden');
      document.getElementById('1498')?.classList.add('animationLife');
      document.getElementById('cenacolo')?.classList.remove('hidden');
      document.getElementById('cenacolo')?.classList.add('animationLife');
      this.anno = '1498'
    }else if(window.scrollY>1523 && window.scrollY<1624){
      document.getElementById('gioconda')?.classList.remove('hidden');
      document.getElementById('gioconda')?.classList.add('animationLife');
      document.getElementById('1503')?.classList.remove('hidden');
      document.getElementById('1503')?.classList.add('animationLife');
      this.anno = '1503'
    }else if(window.scrollY>1712 && window.scrollY<1978){
      document.getElementById('1513')?.classList.remove('hidden');
      document.getElementById('1513')?.classList.add('animationLife');
      this.anno = '1513'
    }else if(window.scrollY>1896 && window.scrollY<2000){
      document.getElementById('1516')?.classList.remove('hidden');
      document.getElementById('1516')?.classList.add('animationLife');
      this.anno = '1516'
    }else if(window.scrollY>2200 && window.scrollY<2400){
      document.getElementById('uomo_vetruviano')?.classList.remove('hidden');
      document.getElementById('uomo_vetruviano')?.classList.add('animationLife');
      document.getElementById('1570')?.classList.remove('hidden');
      document.getElementById('1570')?.classList.add('animationLife');
      this.anno = '1570'
    }else if(window.scrollY>2400){
      document.getElementById('oggi')?.classList.remove('hidden');
      document.getElementById('oggi')?.classList.add('animationLife');
      this.anno = 'Oggi'
    }
  }

}


