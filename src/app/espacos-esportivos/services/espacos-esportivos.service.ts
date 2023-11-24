import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EspacoEsportivoExclusaoResponse as eeExclusaoResponse} from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-exclusao-response.model';
import { EspacoEsportivoRequest as eeRequest } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-request.model';
import { EspacoEsportivoResponse as eeResponse } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { EsporteExclusaoResponse } from 'src/app/shared/models/espaco-esportivo/esporte-exclusao-response.model';
import { EsporteRequest } from 'src/app/shared/models/esporte/esporte-request';
import { EsporteResponse } from 'src/app/shared/models/esporte/esporte-response';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EspacosEsportivosService {
  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {}

  public listarEsportes(): Observable<EsporteResponse[]> {
    return this.httpService.get<EsporteResponse[]>(`${env.baseUrl}esportes`, {
      headers: this.createHeaders(),
    });
  }

  public criarEsporte(e: EsporteRequest): Observable<EsporteResponse> {
    return this.httpService.post(`${env.baseUrl}esportes`, JSON.stringify(e), {
      headers: this.createHeaders(),
    });
  }

  public excluirEsporte(id: number): Observable<EsporteExclusaoResponse> {
    return this.httpService.delete<EsporteExclusaoResponse>(
      `${env.baseUrl}esportes/${id}`,
      { headers: this.createHeaders() }
    );
  }

  public cadastrarEE(ee: eeRequest): Observable<eeResponse> {
    return this.httpService.post<eeResponse>(
      `${env.baseUrl}espacos-esportivos`,
      JSON.stringify(ee),
      { headers: this.createHeaders() }
    );
  }

  public editarEE(ee: eeRequest, idEE: number): Observable<eeResponse> {
    return this.httpService.put<eeResponse>(
      `${env.baseUrl}espacos-esportivos/${idEE}`,
      JSON.stringify(ee),
      { headers: this.createHeaders() }
    );
  }

  public editarDisponibilidade(disponivel: boolean, idEE: number): Observable<eeResponse> {
    return this.httpService.put<eeResponse>(
      `${env.baseUrl}espacos-esportivos/${idEE}`,
      JSON.stringify({disponivel}),
      { headers: this.createHeaders() }
    );
  }

  public listarEE(): Observable<eeResponse[]> {
    return this.httpService.get<eeResponse[]>(
      `${env.baseUrl}espacos-esportivos`,
      { headers: this.createHeaders() }
    );
  }

  public pegarEE(id: number): Observable<eeResponse> {
    return this.httpService.get<eeResponse>(
      `${env.baseUrl}espacos-esportivos/${id}`,
      { headers: this.createHeaders() }
    );
  }

  public excluirEE(id: number): Observable<eeExclusaoResponse> {
    return this.httpService.delete<eeExclusaoResponse>(
      `${env.baseUrl}espacos-esportivos/${id}`,
      { headers: this.createHeaders() }
    );
  }

  private createHeaders(): HttpHeaders {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);

    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados.token!,
    });
  }
}
