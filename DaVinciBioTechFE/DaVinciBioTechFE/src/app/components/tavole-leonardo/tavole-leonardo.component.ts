import { Component,HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tavola } from 'src/app/models/tavola.interface';
import { DvbtService } from 'src/app/services/dvbt.service';
@Component({
  selector: 'app-tavole-leonardo',
  templateUrl: './tavole-leonardo.component.html',
  styleUrls: ['./tavole-leonardo.component.scss'],
})
export class TavoleLeonardoComponent implements OnInit {
  subTavole!: Subscription;
  tavole: Tavola[] = [];
  tavola: Tavola ={
    id: "",
    titolo: "",
    descrizione: "",
    anno: 0,
    url:"",
}
modalIsOpen = false;
parallaxElements: HTMLElement[] = [];

  constructor(private dvbtSrv: DvbtService) { }


  ngOnInit(): void {
    this.subTavole = this.dvbtSrv.getAllTavoleHome().subscribe((response) => {
      this.tavole = response;
      console.log("Tavole in tavole.component")
      console.log(this.tavole);
      this.parallaxElements = Array.from(
        document.querySelectorAll('.my-div')
      ) as HTMLElement[];

    });

  }
  apriModaleOsservaTavola(tavola:Tavola){
    this.modalIsOpen = true;
    this.tavola=tavola;
    const modal = document.getElementById('tavola-eye');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
        this.tavola = tavola;
        console.log(this.tavola)


      }


   }

chiudiModaleOsservaTavola(){
  this.modalIsOpen = false;
  const modal = document.getElementById('tavola-eye');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';

  }
      }
      @HostListener('window:scroll', ['$event'])
      onScroll(event: Event): void {
        const yOffset = window.pageYOffset;
        this.parallaxElements.forEach((element: HTMLElement) => {
          const speed = parseFloat(element.getAttribute('data-speed') || '5');
          const translateY = yOffset * speed;
          element.style.transform = `translate3d(0, ${-translateY}px, 0)`;
        });
      }
}
