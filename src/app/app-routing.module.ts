import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './login/formulario/formulario.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AdministradoresComponent } from './administradores/administradores/administradores.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { ComunicacaoClientesComponent } from './comunicacao-clientes/comunicacao-clientes/comunicacao-clientes.component';
import { EspacosEsportivosComponent } from './espacos-esportivos/espacos-esportivos/espacos-esportivos.component';
import { RelatoriosComponent } from './relatorios/relatorios/relatorios.component';

const routes: Routes = [
   {
     path: 'login',
     component: FormularioComponent,
   },

   {
     path: '',
     redirectTo: 'login',
     pathMatch: 'full',
   },

   {
    path: 'dashboard',
    component: HomeComponent
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
