import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CadastrarSenhaComponent } from './cadastrar-senha/cadastrar-senha.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    LoginComponent,
    CadastrarSenhaComponent,
    RecuperarSenhaComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
  ]
})
export class LoginModule { }
