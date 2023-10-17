import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComunicacaoClientesComponent } from './comunicacao-clientes/comunicacao-clientes.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth/auth.guard';
import { EdicaoPerfilComponent } from './edicao-perfil/edicao-perfil.component';
import { AtivacaoEmailComponent } from './edicao-perfil/ativacao-email/ativacao-email.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'ativar-email',
    component: AtivacaoEmailComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'comunicar-clientes',
    component: ComunicacaoClientesComponent,
    canActivate: [authGuard]
  },

  {
    path: 'relatorios',
    component: RelatoriosComponent,
    canActivate: [authGuard]
  },

  {
    path: 'editar-perfil',
    component: EdicaoPerfilComponent,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
