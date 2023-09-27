import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faChartSimple,
  faDumbbell,
  faHouse,
  faPlusSquare,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, DoCheck {
  faHouse = faHouse;
  faUsers = faUserGroup;
  faEmail = faEnvelope;
  faDumbbell = faDumbbell;
  faChart = faChartSimple;
  faExit = faArrowRightFromBracket;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    const url = this.router.url;
    this.paginaAtual(url.split('/')[1]);
  }

  paginaAtual(url: string): void {
    const inicio = document.getElementById('inicio')?.classList;
    const administradores =
      document.getElementById('administradores')?.classList;
    const clientes = document.getElementById('clientes')?.classList;
    const comunicarClientes =
      document.getElementById('comunicar-clientes')?.classList;
    const espacos = document.getElementById('espacos-esportivos')?.classList;
    const relatorios = document.getElementById('relatorios')?.classList;

    switch (url) {
      case 'dashboard':
        inicio?.add('menu-actived');
        administradores?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        espacos?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'administradores':
        administradores?.add('menu-actived');
        inicio?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        espacos?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'novo-administrador':
        administradores?.add('menu-actived');
        inicio?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        espacos?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'editar-administrador':
        administradores?.add('menu-actived');
        inicio?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        espacos?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'clientes':
        clientes?.add('menu-actived');
        inicio?.remove('menu-actived');
        administradores?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        espacos?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'comunicar-clientes':
        comunicarClientes?.add('menu-actived');
        inicio?.remove('menu-actived');
        clientes?.remove('menu-actived');
        administradores?.remove('menu-actived');
        espacos?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'espacos-esportivos':
        espacos?.add('menu-actived');
        inicio?.remove('menu-actived');
        administradores?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'novo-espaco':
        espacos?.add('menu-actived');
        inicio?.remove('menu-actived');
        administradores?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'editar-espaco':
        espacos?.add('menu-actived');
        inicio?.remove('menu-actived');
        administradores?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'visualizar-espaco':
        espacos?.add('menu-actived');
        inicio?.remove('menu-actived');
        administradores?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;

      case 'relatorios':
        relatorios?.add('menu-actived');
        inicio?.remove('menu-actived');
        administradores?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        espacos?.remove('menu-actived');
        break;

      default:
        inicio?.remove('menu-actived');
        administradores?.remove('menu-actived');
        clientes?.remove('menu-actived');
        comunicarClientes?.remove('menu-actived');
        espacos?.remove('menu-actived');
        relatorios?.remove('menu-actived');
        break;
    }
  }

  sair() {
    if (this.loginService.logout()) {
      this.router.navigateByUrl('/login');
    }
  }
}
