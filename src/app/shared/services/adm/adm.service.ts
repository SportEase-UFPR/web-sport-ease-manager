import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SessionStorageService } from '../session-storage/session-storage.service';
import { Observable } from 'rxjs';
import { Adm } from '../../models/adm/adm.model';
import { environment as env } from 'src/environments/environment';
import { UsuarioSs } from '../../models/usuario-ss/usuario-ss.model';
import { EmailAtivacaoRequest } from '../../models/email-ativacao-request/email-ativacao-request.model';
import { EmailAtivacaoResponse } from '../../models/email-ativacao-response/email-ativacao-response.model';
import { AdmAlteracaoResponse } from '../../models/adm-alteracao-response/adm-alteracao-response.model';
import { AdmAlteracaoRequest } from '../../models/adm-alteracao/adm-alteracao-request.model';

@Injectable({
  providedIn: 'root',
})
export class AdmService {
  private headerWithoutToken: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {}

  getAdm(): Observable<Adm> {
    return this.httpService.get<Adm>(`${env.baseUrl}adm/adm-logado`, {
      headers: this.createHeaders(),
    });
  }

  atualizarDados(adm: AdmAlteracaoRequest): Observable<AdmAlteracaoResponse> {
    return this.httpService.put<AdmAlteracaoResponse>(
      `${env.baseUrl}adm`,
      JSON.stringify(adm),
      { headers: this.createHeaders() }
    );
  }

  ativarEmail(token: EmailAtivacaoRequest): Observable<EmailAtivacaoResponse> {
    return this.httpService.put<EmailAtivacaoResponse>(
      `${env.baseUrl}adm/alterar-email`,
      JSON.stringify(token),
      { headers: this.headerWithoutToken }
    );
  }

  private createHeaders(): HttpHeaders {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);

    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados?.token!,
    });
  }
}
