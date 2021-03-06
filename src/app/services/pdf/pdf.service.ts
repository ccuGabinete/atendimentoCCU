import { Cadastro } from './../../models/cadastro/cadastro';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { body } from '../../services/imagens';
import { TitleCasePipe } from '@angular/common';
import * as moment from 'moment-timezone';
const go = console.log;
moment.defineLocale('America/Sao_Paulo', {
  parentLocale: 'pt-BR'
});

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  imagem = body.formulario;


  constructor(
    private tt: TitleCasePipe
  ) { }


  downloadPDF(cadastro: Cadastro) {
    const atendido = this.tt.transform(cadastro.atendido);
    // const data = this.gerarData(cadastro.data);

    const coord = {

      text01: {
        texto: atendido,
        x: 28,
        y: 89
      },

      text02: {
        texto: cadastro.data.toString(),
        x: 28,
        y: 99
      },

      text03: {
        texto: cadastro.destino,
        x: 28,
        y: 109
      },

      text04: {
        texto: 'cadastro.assunto',
        x: 28,
        y: 119
      },

      text05: {
        texto: cadastro.numero,
        x: 28,
        y: 129
      },

      text06: {
        texto: cadastro.agente,
        x: 28,
        y: 139
      },

      ImageHeader: {
        x: 27,
        y: 25,
        w: 161.375,
        h: 181.525
      }

    };

    const doc = new jsPDF({
      orientaion: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.setProperties({
      title: '',
      subject: '',
      author: '',
      keywords: ' ',
      creator: 'Coordenadoria de Controle Urbano'
    });

    //#region coordenadas
    doc.addImage(this.imagem, 'PNG', coord.ImageHeader.x, coord.ImageHeader.y, coord.ImageHeader.w, coord.ImageHeader.h);
    doc.text(coord.text01.texto, coord.text01.x, coord.text01.y);
    doc.text(coord.text02.texto, coord.text02.x, coord.text02.y);
    doc.text(coord.text03.texto, coord.text03.x, coord.text03.y);
    doc.text(coord.text04.texto, coord.text04.x, coord.text04.y);
    doc.text(coord.text05.texto, coord.text05.x, coord.text05.y);
    doc.text(coord.text06.texto, coord.text06.x, coord.text06.y);
    //#endregion

    doc.save('Comprovante doeumento nº ' + cadastro.numero);
  }

}
