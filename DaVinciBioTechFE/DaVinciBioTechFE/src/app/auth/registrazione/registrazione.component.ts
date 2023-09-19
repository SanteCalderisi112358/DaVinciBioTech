import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})

export class RegistrazioneComponent implements OnInit {

  isLoading = false;
 errori: string[] =[];
  errore: string ="";
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  registra(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
      this.authSrv.signup(form.value).subscribe(
        () => {
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        (error) => {
          if(error.error.errorsList){
            console.error(error.error.errorsList)
            this.errori = error.error.errorsList
            setTimeout(() => {
              this.isLoading = true;
            }, 500);
          }else if(error.error.message){
            console.log(error.error.message)
            this.errore = error.error.message
            setTimeout(() => {
              this.isLoading = true;
            }, 500);
          }
          /*
          this.errori = error.error.errorsList;
          console.error(this.errori);*/
          this.isLoading = false;

        }
      );
    } catch (error) {
      console.error(error);
      this.isLoading = false;
    }

    this.errore =""
    this.errori = []
  }
}
