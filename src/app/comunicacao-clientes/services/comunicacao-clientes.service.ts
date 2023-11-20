import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EmailCliente } from 'src/app/shared/models/cliente/email-cliente.model';
import { SendEmailResponse } from 'src/app/shared/models/cliente/send-email-response.model';
import { SendEmailCliente } from 'src/app/shared/models/cliente/send-email-cliente.model';
import { SendEmailAll } from 'src/app/shared/models/cliente/send-email-all.model';

@Injectable({
  providedIn: 'root',
})
export class ComunicacaoClientesService {
  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {}

  private createHeaders(): HttpHeaders {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);

    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados.token!,
    });
  }

  public buscarClientes(): Observable<EmailCliente[]> {
    return this.httpService.get<EmailCliente[]>(
      `${env.baseUrl}clientes/buscar-emails-clientes`,
      { headers: this.createHeaders() }
    );
  }

  public enviarEmailClientes(
    dados: SendEmailCliente
  ): Observable<SendEmailResponse> {
    return this.httpService.post<SendEmailResponse>(
      `${env.baseUrl}email`,
      JSON.stringify(dados),
      { headers: this.createHeaders() }
    );
  }

  public enviarEmailAll(dados: SendEmailAll): Observable<SendEmailResponse> {
    return this.httpService.post<SendEmailResponse>(
      `${env.baseUrl}email/todos`,
      JSON.stringify(dados),
      { headers: this.createHeaders() }
    );
  }
}
