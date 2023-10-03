import { Component, OnInit } from '@angular/core';

import { SessionStorageService } from './shared/services/session-storage/session-storage.service';
import { UsuarioSs } from './shared/models/usuario-ss/usuario-ss.model';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isNotLogado: boolean = true;

  constructor(private ssService: SessionStorageService, private router: Router) {}

  ngOnInit(): void {
    window.onresize = () => {
      this.formatLayout();
    };
  }

  formatLayout() {
    const alturaJanela = window.innerHeight;
    const alturaMinima = Math.round(alturaJanela * 0.05);
    const alturaMaxima = Math.round(alturaJanela * 0.95) - alturaMinima;
    const cabecalho = document?.getElementById('cabecalho');
    const menu = document?.getElementById('menu');
    const paginas = document?.getElementById('paginas');

    if (cabecalho) cabecalho.style.minHeight = `${alturaMinima}px`;

    if (menu) {
      menu.style.height = `${alturaMaxima}px`;
      menu.style.overflowY = 'scroll';
    }

    if (paginas) paginas.style.minHeight = `${alturaMaxima}px`;
  }

  isLogado(): boolean {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);
    this.formatLayout();

    if (ssDados) {
      return this.router.url.match('ativar-conta') != null
        ? false
        : ssDados.usuarioLogado!;
    } else {
      return false;
    }
  }
}
