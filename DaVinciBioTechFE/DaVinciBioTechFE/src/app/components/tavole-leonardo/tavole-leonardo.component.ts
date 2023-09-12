import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tavola } from 'src/app/models/tavola.interface';
import { TavolaService } from 'src/app/services/tavole.service';
@Component({
  selector: 'app-tavole-leonardo',
  templateUrl: './tavole-leonardo.component.html',
  styleUrls: ['./tavole-leonardo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TavoleLeonardoComponent implements OnInit {
  subTavole!: Subscription;
  tavole: Tavola[] = [];
tavolaSingola:Tavola | undefined;
  constructor(private tavolaSrv: TavolaService) { }


  ngOnInit(): void {
    this.subTavole = this.tavolaSrv.getAllTavole().subscribe((response) => {
      this.tavole = response;
      console.log("Tavole in tavole.component")
      console.log(this.tavole);


    });
  }

}
