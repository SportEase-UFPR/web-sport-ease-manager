import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministradoresComponent } from './administradores/administradores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ComunicacaoClientesComponent } from './comunicacao-clientes/comunicacao-clientes.component';
import { EspacosEsportivosComponent } from './espacos-esportivos/espacos-esportivos.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

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
    component: DashboardComponent
   },

   {
    path: 'administradores',
    component: AdministradoresComponent
   },

   {
    path: 'clientes',
    component: ClientesComponent
   },

   {
    path: 'comunicar-clientes',
    component: ComunicacaoClientesComponent
   },

   {
    path: 'espacos-esportivos',
    component: EspacosEsportivosComponent
   },

   {
    path: 'relatorios',
    component: RelatoriosComponent
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
