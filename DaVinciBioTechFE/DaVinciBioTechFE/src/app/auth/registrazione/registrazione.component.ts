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
          this.isLoading = false;
        }
      );
    } catch (error) {
      console.error(error);
      this.isLoading = false;
    }
  }
}
