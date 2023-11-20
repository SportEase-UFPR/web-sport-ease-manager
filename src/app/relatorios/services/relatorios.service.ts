import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncerrarReserva } from 'src/app/shared/models/reserva/encerrar-reserva.model';
import { NegarReserva } from 'src/app/shared/models/reserva/negar-reserva.model';
import { Reserva } from 'src/app/shared/models/reserva/reserva.model';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
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

  public buscarRelatorios(): Observable<Reserva[]> {
    return this.httpService.get<Reserva[]>(
      `${env.baseUrl}locacoes/relatorio-reservas`,
      { headers: this.createHeaders() }
    );
  }

  public aprovarReserva(id: number) {
    return this.httpService.put(
      `${env.baseUrl}locacoes/aprovar-reserva/${id}`,
      null,
      { headers: this.createHeaders() }
    );
  }

  public negarReserva(id: number, dados: NegarReserva) {
    return this.httpService.put(
      `${env.baseUrl}locacoes/negar-reserva/${id}`,
      JSON.stringify(dados),
      { headers: this.createHeaders() }
    );
  }

  public encerrarReserva(idReserva: number, dados: EncerrarReserva) {
    return this.httpService.put(
      `${env.baseUrl}locacoes/encerrar-reserva/${idReserva}`,
      JSON.stringify(dados),
      { headers: this.createHeaders() }
    );
  }
}
