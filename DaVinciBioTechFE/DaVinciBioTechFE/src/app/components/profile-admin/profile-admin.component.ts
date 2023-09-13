import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utente } from 'src/app/models/utente.interface';
import { DvbtService } from 'src/app/services/dvbt.service';

@Component({
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  subUtenti: Subscription | undefined;
  utenti: Utente[] = [];
  currentPage: number = 1;
  totalPagesArray: number[] = [];
  pageSize: number = 10;
  constructor(private dvbtSrv: DvbtService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.subUtenti = this.dvbtSrv.getAllUtenti(page - 1, this.pageSize, "nome").subscribe((response: any) => {
      this.utenti = response['content'];
      this.totalPagesArray = Array.from({ length: response['totalPages'] }, (_, i) => i + 1);
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.loadPage(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  setPageSize(size: number): void {
    console.log(size)
    this.pageSize = size;
this.loadPage(1)
  }
}
