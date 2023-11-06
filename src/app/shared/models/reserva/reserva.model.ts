import { StatusLocacao } from "../enums/status-locacao";
import { InformacoesComplementaresLocacao } from "./Informacoes-complementares-locacao.model";

export class Reserva {
  constructor(
    public id?: number,
    public motivoSolicitacao?: string,
    public qtdParticipantes?: number,
    public dataHoraSolicitacao?: Date | string,
    public dataHoraInicioReserva?: Date | string,
    public dataHoraFimReserva?: Date | string,
    public status?: StatusLocacao,
    public motivoCancelamento?: string,
    public informacoesComplementaresLocacao?: InformacoesComplementaresLocacao
  ) {}
}
