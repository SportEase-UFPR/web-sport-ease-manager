import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministradoresComponent } from './administradores/administradores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ComunicacaoClientesComponent } from './comunicacao-clientes/comunicacao-clientes.component';
import { EspacosEsportivosComponent } from './espacos-esportivos/espacos-esportivos.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
   {
     path: 'login',
     component: LoginComponent,
   },

   {
     path: '',
     redirectTo: 'login',
     pathMatch: 'full',
   },

   {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
   },

   {
    path: 'administradores',
    component: AdministradoresComponent,
    canActivate: [authGuard]
   },

   {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [authGuard]
   },

   {
    path: 'comunicar-clientes',
    component: ComunicacaoClientesComponent,
    canActivate: [authGuard]
   },

   {
    path: 'espacos-esportivos',
    component: EspacosEsportivosComponent,
    canActivate: [authGuard]
   },

   {
    path: 'relatorios',
    component: RelatoriosComponent,
    canActivate: [authGuard]
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
