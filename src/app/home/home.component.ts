import { AlertaComponent } from './../alerta/alerta.component';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from './../services/acesso/login.service';
import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario/usuario';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material';
import { SucessoService } from '../services/sucesso/SucessoService';
import { LogadoService } from '../services/logado/logado.service';
const go = console.log;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LoginService, Usuario]
})

export class HomeComponent implements OnInit, OnDestroy {

  observer: Subscription;
  durationInSeconds = 225;


    constructor(
      private router: Router,
      public usuario: Usuario,
      public login: LoginService,
      private _snackBar: MatSnackBar,
      private aviso: SucessoService,
      private logado: LogadoService
      ) {}

      openSnackBar() {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.verticalPosition = 'top';
        this._snackBar.openFromComponent(AlertaComponent, config);
      }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.usuario.login || !this.usuario.senha){
      this.openSnackBar();
    }else{
      this.observer = this.login.getUser(this.usuario).subscribe(
        res => {
          if  ( res.isValid ) {
            this.logado.mudarUsuario(res);
            this.router.navigateByUrl('dados');
            
          } else  {
            this.openSnackBar();
          }
        }
      );
    }
    
    
  }

  ngOnDestroy(): void {
    this.aviso.mudarAviso(false);
  }

}
