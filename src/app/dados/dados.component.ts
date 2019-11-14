import { Component, OnInit, OnDestroy } from '@angular/core';
import { Setores } from '../models/setores/setores';
import { Documentos } from '../models/documentos/documentos';
import { Cadastro } from '../models/cadastro/cadastro';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material';
import { AvisosalvarService } from '../services/avisosalvar/avisosalvar.service';
import { AvisosalvarComponent } from '../avisosalvar/avisosalvar.component';
import { AvisocamposComponent } from '../avisocampos/avisocampos.component';
import { SalvarcadastroService } from '../services/salvarcadastro/salvarcadastro.service';
import { LogadoService } from '../services/logado/logado.service';
import { AvisocamposService } from '../services/avisocampos/avisocampos.service';
import * as moment from 'moment-timezone';
import { Usuario } from '../models/usuario/usuario';
import { Router } from '@angular/router';
const go = console.log;


@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit, OnDestroy {
  nome: string;

  constructor(
    public cadastro: Cadastro,
    private usuario: Usuario,
    private _snackBar: MatSnackBar,
    private serviceSalvar: AvisosalvarService,
    private serviceCampos: AvisocamposService,
    private salvarservice: SalvarcadastroService,
    private logado: LogadoService,
    private router: Router
  ) { }

  setores = new Setores().getTipos();
  documentos = new Documentos().getDocs();

  ngOnInit() {
    this.cadastro = new Cadastro();
    this.cadastro.matricula = '';
    this.cadastro.data = this.gerarData();
    this.logado.currentMessage.subscribe(user => {
      (user.nome) ? this.usuario.nome = user.nome : this.usuario.nome = '';
      (user.link) ? this.usuario.link = user.link.replace('open', 'uc') : this.usuario.link = '';
    })
  }

  onLogout() {
    this.usuario = new Usuario();
    this.logado.mudarUsuario(this.usuario);
    this.router.navigateByUrl('');
  }

  onSubmit(){
   if(
        !this.nome 
    ||  !this.cadastro.destino 
    ||  !this.cadastro.documento
    ||  !this.cadastro.numero
   ){
      this.serviceCampos.mudarAviso(false);
      this.openSnackBarCampos();
   }else{
      this.cadastro.atendido = this.nome.toUpperCase();
      this.salvarservice.salvarCadastro(this.cadastro).subscribe(data => {        
        if (data.atendido){
          this.serviceSalvar.mudarAviso(true);
          this.openSnackBarSalvar();
          this.reset();
        }else{
          this.openSnackBarSalvar();
        }
        
      }
    )
   }
  }

  openSnackBarSalvar() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    this._snackBar.openFromComponent(AvisosalvarComponent, config);
  }

  openSnackBarCampos() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    this._snackBar.openFromComponent(AvisocamposComponent, config);
  }

  reset() {
    this.nome = null;
    this.cadastro.destino = "Setor";
    this.cadastro.documento = "Documento";
    this.cadastro.numero = null;
  }

  gerarData(){
    let data = Date.now();
    let dateMoment = moment(data);
    return dateMoment.tz('America/Sao_Paulo').format('DD/MM/YYYY hh:mm:ss A');
  }

  ngOnDestroy(): void {
    
  }

}
