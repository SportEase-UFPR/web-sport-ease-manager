import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, isEmpty } from 'rxjs';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';
import { EspacoEsportivoResponse as eeResponse } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { FeedbackReserva } from 'src/app/shared/models/reserva/feedback-reserva.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksService {
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

  public listarEE(): Observable<eeResponse[]> {
    return this.httpService.get<eeResponse[]>(
      `${env.baseUrl}espacos-esportivos`,
      { headers: this.createHeaders() }
    );
  }

  public buscarComentarios(idEspaco: number): Observable<FeedbackReserva[]> {
    return this.httpService.get<FeedbackReserva[]>(
      `${env.baseUrl}espacos-esportivos/comentarios/${idEspaco}`,
      { headers: this.createHeaders() }
    );
  }

  public deletarComentario(idLocacao: number) {
    return this.httpService.delete(`${env.baseUrl}locacoes/comentarios/${idLocacao}`, {headers: this.createHeaders()})
  }
}
