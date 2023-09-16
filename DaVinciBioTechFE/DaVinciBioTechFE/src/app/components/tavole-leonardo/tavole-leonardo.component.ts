import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tavola } from 'src/app/models/tavola.interface';
import { DvbtService } from 'src/app/services/dvbt.service';
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
  constructor(private dvbtSrv: DvbtService) { }


  ngOnInit(): void {
    this.subTavole = this.dvbtSrv.getAllTavoleHome().subscribe((response) => {
      this.tavole = response;
      console.log("Tavole in tavole.component")
      console.log(this.tavole);


    });
  }

}
