import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ClienteDetalhado } from 'src/app/shared/models/cliente/cliente-detalhado.model';
import { BloquearContaRequest } from 'src/app/shared/models/cliente/bloquear-conta-request.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
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

  public buscarCliente(): Observable<ClienteDetalhado[]> {
    return this.httpService.get<ClienteDetalhado[]>(
      `${env.baseUrl}clientes/detalhes`,
      { headers: this.createHeaders() }
    );
  }

  public bloquarCliente(idUsuario: number, dados: BloquearContaRequest) {
    return this.httpService.put(
      `${env.baseUrl}usuarios/bloquear-conta/${idUsuario}`,
      JSON.stringify(dados),
      { headers: this.createHeaders() }
    );
  }

  public desbloquarCliente(idUsuario: number) {
    return this.httpService.put(
      `${env.baseUrl}usuarios/desbloquear-conta/${idUsuario}`,
      null,
      { headers: this.createHeaders() }
    );
  }
}
