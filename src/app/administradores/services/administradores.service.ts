import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdmCriacaoRequest } from 'src/app/shared/models/adm/adm-criacao-request';
import { AdmCriacaoResponse } from 'src/app/shared/models/adm/adm-criacao-response';
import { AdmExclusaoResponse } from 'src/app/shared/models/adm/adm-exclusao-response';
import { Adm } from 'src/app/shared/models/adm/adm.model';
import { AtivacaoConta } from 'src/app/shared/models/adm/ativacao-conta.model';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdministradoresService {
  private headerWithoutToken: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {}

  getAdministradores(): Observable<Adm[]> {
    return this.httpService.get<Adm[]>(`${env.baseUrl}adm`, {
      headers: this.createHeraders(),
    });
  }

  cadastrarAdm(adm: AdmCriacaoRequest): Observable<AdmCriacaoResponse> {
    return this.httpService.post<AdmCriacaoResponse>(
      `${env.baseUrl}adm`,
      JSON.stringify(adm),
      { headers: this.createHeraders() }
    );
  }

  ativarConta(token: string): Observable<AtivacaoConta> {
    return this.httpService.put<AtivacaoConta>(
      `${env.baseUrl}usuarios/ativacao/${token}`,
      {
        headers: this.headerWithoutToken,
      }
    );
  }

  deletarAdm(idAdm: number): Observable<AdmExclusaoResponse> {
    return this.httpService.delete<AdmExclusaoResponse>(
      `${env.baseUrl}adm/${idAdm}`,
      { headers: this.createHeraders() }
    );
  }

  private createHeraders(): HttpHeaders {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);

    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados.token!,
    });
  }
}
