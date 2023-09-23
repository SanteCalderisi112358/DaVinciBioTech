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

    const img7 = document.querySelector('.img7') as HTMLElement;
    const img1NoBio = document.querySelector('.img1-noBio') as HTMLElement;

    if (img7) {
      console.log(img7)
      console.log("BackGroundSize img7"+img7.style.backgroundSize)
      console.log(`${100 + window.scrollY / 5}%`)
      img7.style.backgroundSize = `${-300 + window.scrollY / 5.5}%`;
    }

    if (img1NoBio) {
      console.log(img1NoBio)
      console.log("BackGroundY img1NoBio"+img1NoBio.style.backgroundSize)
      console.log(`${100 + window.scrollY / 5}px`)
      img1NoBio.style.backgroundPositionY = `${500 - window.scrollY / 5.5}px`;

    }
  }
  }



