import { PdfService } from './../services/pdf/pdf.service';
import { IAssunto } from './../interfaces/iAssunto/i-assunto';
import { IGrupo } from './../interfaces/iGrupo/i-grupo';
import { Destino } from './../models/destino/destino';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Setores } from '../models/setores/setores';
import { Documentos } from '../models/documentos/documentos';
import { Cadastro } from '../models/cadastro/cadastro';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
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
  comprovante: string;
  setores: IGrupo[] = [];
  assuntos: IAssunto[] = [];
  disabled = false;

  constructor(
    public cadastro: Cadastro,
    public usuario: Usuario,
    private _snackBar: MatSnackBar,
    private serviceSalvar: AvisosalvarService,
    private serviceCampos: AvisocamposService,
    private salvarservice: SalvarcadastroService,
    private logado: LogadoService,
    private router: Router,
    private destino: Destino,
    private pdfservice: PdfService
  ) { }

  documentos = new Documentos().getDocs();

  ngOnInit() {
    this.destino = new Destino();
    this.cadastro = new Cadastro();
    this.cadastro.agente = this.usuario.nome;
    this.cadastro.data = this.gerarData();
    this.logado.currentMessage.subscribe(user => {
      (user.nome) ? this.usuario.nome = user.nome : this.usuario.nome = '';
      (user.nome) ? this.cadastro.agente = user.nome : this.cadastro.agente = '';
      (user.link) ? this.usuario.link = user.link.replace('open', 'uc') : this.usuario.link = '';
    });

    this.setores = this.destino.getGrupo().sort(function (a, b) {
      const x = a.setor.toLowerCase();
      const y = b.setor.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
  }

  onLogout() {
    this.usuario = new Usuario();
    this.logado.mudarUsuario(this.usuario);
    this.router.navigateByUrl('');
  }

  onChangeNumero() {
    this.cadastro.numero = this.cadastro.numero.replace(/[^\d]+/g, '');
  }

  onSelectedSetor(setor: string) {
    this.assuntos = this.destino.selectedAssunto(setor);
  }


  onSubmit() {
    this.disabled = true; 

    if (
      !this.nome
      || !this.cadastro.destino
      || !this.cadastro.documento
      || !this.cadastro.numero
      || !this.cadastro.assunto
    ) {
      this.disabled = false;
      this.serviceCampos.mudarAviso(false);
      this.openSnackBarCampos();
    } else {
      this.cadastro.atendido = this.nome.toUpperCase();
      this.salvarservice.salvarCadastro(this.cadastro).subscribe(data => {
        if (data.atendido) {
          this.serviceSalvar.mudarAviso(true);
          this.openSnackBarSalvar();
          this.reset();
          this.disabled = false;
        } else {
          this.openSnackBarSalvar();
        }

      }
      );
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
    this.cadastro = new Cadastro();
  }

  gerarData() {
    const data = Date.now();
    const dateMoment = moment(data);
    return dateMoment.tz('America/Sao_Paulo').format('DD/MM/YYYY hh:mm:ss A');
  }

  onImprimeComprovante() {
    if (this.comprovante) {
      this.salvarservice.buscarDocumento(this.comprovante).subscribe(data => {
        if (data.length > 0) {
          go(data[0]);
          this.pdfservice.downloadPDF(data[0]);
        }
      });
    }
  }

  onChangeComprovante() {
    this.comprovante = this.comprovante.replace(/[^\d]+/g, '');
  }

  ngOnDestroy(): void {

  }

}
