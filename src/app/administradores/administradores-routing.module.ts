import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth/auth.guard';
import { FormComponent } from './form/form.component';
import { AdministradoresComponent } from './administradores.component';

const routes: Routes = [
  {
    path: 'administradores',
    component: AdministradoresComponent,
    //canActivate: [authGuard]
  },

  {
    path: 'novo-administrador',
    component: FormComponent,
    //canActivate: [authGuard],
  },

  {
    path: 'editar-administrador/:id',
    component: FormComponent,
    //canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradoresRoutingModule {}
