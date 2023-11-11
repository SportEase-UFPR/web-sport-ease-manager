export class ClienteDetalhado {
  constructor(
    public id?: number,
    public usuarioId?: number,
    public bloqueada?: boolean,
    public nome?: string,
    public email?: string,
    public cpf?: string,
    public grr?: string,
    public alunoUFPR?: boolean,
    public totalReservas?: number,
    public totalReservasSolicitadas?: number,
    public totalReservasCanceladas?: number,
    public totalReservasAprovadas?: number,
    public totalReservasNegadas?: number,
    public totalReservasFinalizadas?: number,
    public totalReservasEncerradas?: number
  ) {}
}
