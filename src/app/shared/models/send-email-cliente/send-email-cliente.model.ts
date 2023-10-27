export class SendEmailCliente {
  constructor(
    public listaEmails?: string[],
    public assunto?: string,
    public corpo?: string
  ) {}
}
