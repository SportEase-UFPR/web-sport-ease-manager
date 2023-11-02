import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';
import { EspacoEsportivoResponse as eeResponse } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-response.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksService {
  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {}

  private createHeraders(): HttpHeaders {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);

    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados.token!,
    });
  }

  public listarEE(): Observable<eeResponse[]> {
    return this.httpService.get<eeResponse[]>(
      `${env.baseUrl}espacos-esportivos`,
      { headers: this.createHeraders() }
    );
  }
}
