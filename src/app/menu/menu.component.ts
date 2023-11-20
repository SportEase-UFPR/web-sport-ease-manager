import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faChartSimple,
  faDumbbell,
  faHouse,
  faPlusSquare,
  faUserGroup,
  faUsers,
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
  faUsersGroup = faUsers;
  faEmail = faEnvelope;
  faDumbbell = faDumbbell;
  faComments = faComments;
  faChart = faChartSimple;
  faExit = faArrowRightFromBracket;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    const url = this.router.url;
    this.paginaAtual(url.split('/')[1]?.split('?')[0]);
  }

  paginaAtual(url: string): void {
    const menuList: { [key: string]: string } = {
      dashboard: 'inicio',
      administradores: 'administradores',
      'novo-administrador': 'administradores',
      'editar-administrador': 'administradores',
      'comunicar-clientes': 'comunicar-clientes',
      'espacos-esportivos': 'espacos-esportivos',
      'novo-espaco': 'espacos-esportivos',
      'editar-espaco': 'espacos-esportivos',
      'visualizar-espaco': 'espacos-esportivos',
      clientes: 'clientes',
      relatorios: 'relatorios',
      feedbacks: 'feedbacks',
    };

    for (const item of Object.values(menuList)) {
      const element = document.getElementById(item);
      if (element) {
        element.classList.remove('menu-actived');
      }
    }

    const menuItem = menuList?.[url];
    if (menuItem) {
      const element = document.getElementById(menuItem);
      if (element) {
        element.classList.add('menu-actived');
      }
    }
  }

  sair() {
    if (this.loginService.logout()) {
      this.router.navigateByUrl('/login');
    }
  }
}
