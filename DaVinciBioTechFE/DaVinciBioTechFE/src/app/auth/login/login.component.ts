import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { DvbtService } from 'src/app/services/dvbt.service';
import { RecuperoPassword } from 'src/app/models/recupero-password.interface';
import { Utente } from 'src/app/models/utente.interface';
import { TipoRuolo } from 'src/app/models/tipo-utente.enum';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
errore:string | undefined;
  isLoading = false;
  erroreLogin = false;
  isErroreRecuperoPassword:boolean = true; ;
  erroreRecuperoPassword:string = ''
  messaggioOk:string =''
  emailUtente:string = '';
  isModaleOpen:boolean=false;
  loginForm:NgForm | undefined;
  recuperoPasswordData = {
    recoveryEmail: ''
  };
  emailRecupero:RecuperoPassword={
    email:''
  }
  utente:Utente={
    email:"",
  nome:"",
  cognome:"",
  ruolo: TipoRuolo.USER,
  id:""
  }
  constructor(private authServ:AuthService, private router:Router, private dvbtSrv:DvbtService) { }

  ngOnInit(): void {
  }

  access(form:NgForm){
this.loginForm = form
    setTimeout(() => {
      this.isLoading = true;
    }, 1500);
    console.log(this.loginForm.value)
    try {
      this.authServ.login(this.loginForm.value).subscribe(
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



  apriModaleRecuperaPassword() {
    this.utente = {
      email: "",
      nome: "",
      cognome: "",
      ruolo: TipoRuolo.USER,
      id: ""
    };
    this.isErroreRecuperoPassword= false
    this.isModaleOpen=true;
    const modal = document.getElementById('recupero-password');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
  }
  }
  cambioPassword(form:NgForm) {
    this.emailRecupero.email = form.value.recoveryEmail
    console.log(this.emailRecupero)
try{
 this.dvbtSrv.recuperoPassword(this.emailRecupero).subscribe((response)=>{
if(response){
  this.messaggioOk = 'La tua password è stata aggiornata. Riceverai una e-mail con le indicazioni.'
form.reset()
}


    },

    (error: any) => {
      console.error(error.error.message);
      this.erroreRecuperoPassword = error.error.message;
    }
    )
}catch(error:any){
  //console.error(error.error.message)
}






      }
  chiudiModaleRecuperaPassword() {
   this.messaggioOk = ''
    this.isModaleOpen=false;
    this.erroreRecuperoPassword =''
    const modal = document.getElementById('recupero-password');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
  }




}
