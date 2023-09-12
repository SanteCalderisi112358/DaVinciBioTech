import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
errore:string | undefined;
  isLoading = false;
  erroreLogin = false;
  constructor(private authServ:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  access(form:NgForm){
    this.isLoading = true
    console.log(form.value)
    try {
      this.authServ.login(form.value).subscribe(
        () => {
          this.router.navigate(['']);
          this.isLoading = false;
        },
        (error) => {
       this.errore = error.error.message;
       if(error.error.message[0]==='U'){
        this.errore = 'La tua email non è stata trovata. Registrati!'
       }
       console.log(this.errore)
       if(this.errore!==null){
        this.erroreLogin = true;
       }
          this.isLoading = false;
        }
      );
    } catch (error: any) {
      console.error(error);
      this.isLoading = false;
    }



  }
}
