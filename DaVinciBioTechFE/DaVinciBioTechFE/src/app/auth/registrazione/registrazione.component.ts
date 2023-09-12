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
          this.errori = error.error.errorsList;
          console.error(this.errori);
          /*this.errori.forEach((errore: string) => {
            if (errore === 'La password deve contenere almeno un numero') {
              alert('La password deve contenere almeno un numero!');
            } else if (errore === 'La password deve avere minimo 8 caratteri, massimo 30') {
              alert('La password deve avere minimo 8 caratteri, massimo 30!');
            } else if (errore === 'La password deve contenere almeno una lettera maiuscola') {
              alert('La password deve contenere almeno una lettera maiuscola!');
            } else if (errore === 'La password deve contenere almeno una lettera minuscola') {
              alert('La password deve contenere almeno una lettera minuscola!');
            } else if (errore === "L'email è già stata utilizzata") {
              alert("L'email è già stata utilizzata!");
            } else if (errore === "L'email inserita è in un formato non valido") {
              alert("L'email inserita è in un formato non valido!");
            }
          });*/


          this.isLoading = false;
        }
      );
    } catch (error) {
      console.error(error);
      this.isLoading = false;
    }
  }
}
