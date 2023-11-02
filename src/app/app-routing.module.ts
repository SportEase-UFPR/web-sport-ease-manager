import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComunicacaoClientesComponent } from './comunicacao-clientes/comunicacao-clientes.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth/auth.guard';
import { EdicaoPerfilComponent } from './edicao-perfil/edicao-perfil.component';
import { AtivacaoEmailComponent } from './edicao-perfil/ativacao-email/ativacao-email.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { FormComponent as FormAdm } from './administradores/form/form.component';
import { AtivacaoContaComponent } from './administradores/ativacao-conta/ativacao-conta.component';
import { EspacosEsportivosComponent } from './espacos-esportivos/espacos-esportivos.component';
import { FormComponent } from './espacos-esportivos/form/form.component';
import { RecuperarSenhaComponent } from './login/recuperar-senha/recuperar-senha.component';
import { CadastrarSenhaComponent } from './login/cadastrar-senha/cadastrar-senha.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';

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
    canActivate: [authGuard],
  },

  {
    path: 'comunicar-clientes',
    component: ComunicacaoClientesComponent,
    canActivate: [authGuard],
  },

  {
    path: 'relatorios',
    component: RelatoriosComponent,
    canActivate: [authGuard],
  },

  {
    path: 'editar-perfil',
    component: EdicaoPerfilComponent,
    canActivate: [authGuard],
  },

  {
    path: 'administradores',
    component: AdministradoresComponent,
    canActivate: [authGuard],
  },

  {
    path: 'novo-administrador',
    component: FormAdm,
    canActivate: [authGuard],
  },

  {
    path: 'editar-administrador/:id',
    component: FormAdm,
    canActivate: [authGuard],
  },

  {
    path: 'ativar-conta',
    component: AtivacaoContaComponent,
  },

  {
    path: 'feedbacks',
    component: FeedbacksComponent,
    canActivate: [authGuard],
  },

  {
    path: 'espacos-esportivos',
    component: EspacosEsportivosComponent,
    canActivate: [authGuard],
  },

  {
    path: 'novo-espaco',
    component: FormComponent,
    canActivate: [authGuard],
  },

  {
    path: 'editar-espaco/:id',
    component: FormComponent,
    canActivate: [authGuard],
  },

  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent,
  },

  {
    path: 'cadastrar-senha',
    component: CadastrarSenhaComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '**',
    component: PageNotFoundComponent,
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
