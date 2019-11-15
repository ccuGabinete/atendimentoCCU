import { IGrupo } from './../../interfaces/iGrupo/i-grupo';
import { IAssunto } from './../../interfaces/iAssunto/i-assunto';

export class Destino {
  getGrupo(): IGrupo[] {
    return [
      { setor: 'Gabinete', id: 1 },
      { setor: 'Controle de Autos', id: 2 },
      { setor: 'Protocolo ', id: 3 },
      { setor: 'GPA', id: 4 },
      { setor: 'GPA - 3', id: 5 },
      { setor: 'Ouvidoria', id: 6 },
      { setor: 'GOP', id: 7 },
      { setor: 'CLF', id: 8 }
    ];
  }

  getAssunto(): IAssunto[] {
    return [
      { assunto: 'Reunião', id: 1 },
      { assunto: 'Agendamento', id: 1 },
      { assunto: 'Atendimento', id: 1 },
      { assunto: 'Retirada de Crachá', id: 1 },
      { assunto: 'Outros', id: 1 },
      { assunto: 'Retirada 1º via de A.I', id: 2 },
      { assunto: 'Consulta de Multas', id: 2 },
      { assunto: 'Consulta de Recursos ', id: 2 },
      { assunto: 'Outros', id: 2 },
      { assunto: 'Consulta de Processo', id: 3 },
      { assunto: 'Abertura de Processo', id: 3 },
      { assunto: 'Recebimento de Documentos', id: 3 },
      { assunto: 'Outros', id: 3 },
      { assunto: 'Atendimento', id: 4 },
      { assunto: 'Outros', id: 4 },
      { assunto: 'Recebimento de Material', id: 5 },
      { assunto: 'Atendimento', id: 5 },
      { assunto: 'Outros', id: 5 },
      { assunto: 'Atendimento', id: 6 },
      { assunto: 'Consulta de Chamado 1746', id: 6 },
      { assunto: 'Consulta de Ouvidoria', id: 6 },
      { assunto: 'Outros', id: 6 },
      { assunto: 'Atendimento', id: 7 },
      { assunto: 'Consulta de Notificação', id: 7 },
      { assunto: 'Outros', id: 7 },
      { assunto: 'Cadastramento de Ambulantes', id: 8 },
      { assunto: 'Prova de Vida', id: 8 },
      { assunto: 'Alteração Cadastral', id: 8 },
      { assunto: 'Consulta de Processo', id: 8 },
      { assunto: 'Outros', id: 8 }
    ];
  }

  selectedAssunto(setor: string): IAssunto[] {
    const index = this.getGrupo().findIndex(x => x.setor === setor);
    const id = this.getGrupo()[index].id;
    const assunto = this.getAssunto().filter(x => x.id === id);
    return assunto;
  }
}
