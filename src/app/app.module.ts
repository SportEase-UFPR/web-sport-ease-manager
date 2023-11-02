import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MenuComponent } from './menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { ComunicacaoClientesModule } from './comunicacao-clientes/comunicacao-clientes.module';
import { EspacosEsportivosModule } from './espacos-esportivos/espacos-esportivos.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EdicaoPerfilModule } from './edicao-perfil/edicao-perfil.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeedbacksModule } from './feedbacks/feedbacks.module';

@NgModule({
  declarations: [AppComponent, CabecalhoComponent, MenuComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    DashboardModule,
    AdministradoresModule,
    ComunicacaoClientesModule,
    EspacosEsportivosModule,
    RelatoriosModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EdicaoPerfilModule,
    FeedbacksModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
