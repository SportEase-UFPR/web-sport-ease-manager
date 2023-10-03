import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth/auth.guard';
import { EspacosEsportivosComponent } from './espacos-esportivos.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
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
    path: 'visualizar-espaco/:id',
    component: FormComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspacosEsportivosRoutingModule {}
