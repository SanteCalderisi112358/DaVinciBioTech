import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.scss']
})
export class ChiSiamoComponent implements OnInit {
  translateY = 0;
  speed = 0.5;
  @ViewChild('img3', { static: true })
  img3!: ElementRef;
  @ViewChild('img4', { static: true })
  img4!: ElementRef;
  @ViewChild('img5', { static: true })
  img5!: ElementRef;
  @ViewChild('img6', { static: true })
  img6!: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.translateY = -window.scrollY * this.speed;
    const img2 = document.getElementById('img2');
    const img8 = document.querySelector('.img8') as HTMLElement
    const img7 = document.querySelector('.img7') as HTMLElement;
    const img1NoBio = document.querySelector('.img1-noBio') as HTMLElement;


    if (img2) {
      const backgroundPositionY = `${-60 + window.scrollY * 0.3}px`;
      img2.style.backgroundPositionY = backgroundPositionY;
    }

    if (this.img3) {
      const img3OffsetTop = this.img3.nativeElement.offsetTop;
      if (window.scrollY > img3OffsetTop) {

        this.img3.nativeElement.style.backgroundPositionY = `${-500+ window.scrollY * 0.3}px`;
        this.img4.nativeElement.style.backgroundPositionY = `${500-window.scrollY * 0.3}px`;
        this.img5.nativeElement.style.backgroundPositionY = `${-500+window.scrollY * 0.3}px`;
        this.img6.nativeElement.style.backgroundPositionY = `${500-window.scrollY * 0.3}px`;
      }
    }

    if (img7) {
      img7.style.backgroundPositionY = `${-400 + window.scrollY / 5.5}px`;
    }

    if (img1NoBio) {
      img1NoBio.style.backgroundPositionY = `${500 - window.scrollY / 5.5}px`;

    }

    if(img8){
      console.log(window.scrollY)
      console.log(img8)
      img8.style.backgroundPositionX = `${500 - window.scrollY / 5.5}px`
    }
  }
  }



