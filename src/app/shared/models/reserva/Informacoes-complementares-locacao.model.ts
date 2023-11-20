export class InformacoesComplementaresLocacao {
  constructor(
    public idLocacao?: number,
    public idEspacoEsportivo?: number,
    public nomeEspacoEsportivo?: string,
    public localidadeEspacoEsportivo?: string,
    public idCliente?: number,
    public nomeCliente?: string,
    public cpfCliente?: string,
    public emailCliente?: string,
    public alunoUFPR?: boolean,
    public grr?: string
  ) {}
}
