export class AdmCriacaoResponse {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public cpf?: string,
    public nivelAcesso?: string
  ) {}
}
