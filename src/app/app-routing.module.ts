import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './login/formulario/formulario.component';

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
