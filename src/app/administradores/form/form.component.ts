import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, take, takeUntil } from 'rxjs';
import { AdmCriacaoRequest } from 'src/app/shared/models/adm/adm-criacao-request';
import { AdmCriacaoResponse } from 'src/app/shared/models/adm/adm-criacao-response';
import { AdministradoresService } from '../services/administradores.service';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  public formAdministrador: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cpf: new FormControl(null, [Validators.required]),
    senha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmacaoSenha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  faInvalid = faXmark;
  faValid = faCheck;
  senhasDiferentes: boolean = true;
  passwordChecklist: boolean = false;
  focusPasswordType?: string;

  senha$ = new Subject();
  confirmacaoSenha$ = new Subject();

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private admsService: AdministradoresService
  ) {}

  ngOnInit(): void {
    this.formAdministrador
      .get('senha')
      ?.valueChanges.pipe(takeUntil(this.senha$))
      .subscribe(() => this.verificarSenhas());

    this.formAdministrador
      .get('confirmacaoSenha')
      ?.valueChanges.pipe(takeUntil(this.confirmacaoSenha$))
      .subscribe(() => this.verificarSenhas());
  }

  ngOnDestroy(): void {
    this.senha$.next(null);
    this.confirmacaoSenha$.next(null);
    this.senha$.complete();
    this.confirmacaoSenha$.complete();
  }

  verificarSenhas() {
    const result = ValidacoesForm.senhasValid(
      this.formAdministrador.get('senha')!,
      this.formAdministrador.get('confirmacaoSenha')!,
      this.passwordChecklist
    );
    this.passwordChecklist = result;
    this.senhasDiferentes = result;
  }

  focusPassword() {
    this.passwordChecklist = true;
  }

  cadastrarAdm(): void {
    this.ngxLoaderService.startLoader('loader-01');

    const form = this.formAdministrador;
    if (form.valid) {
      const dados: AdmCriacaoRequest = new AdmCriacaoRequest(
        form.get('nome')?.value,
        form.get('email')?.value,
        form.get('cpf')?.value,
        form.get('senha')?.value
      );
      this.admsService
        .cadastrarAdm(dados)
        .pipe(take(1))
        .subscribe({
          next: (result: AdmCriacaoResponse) => {
            this.ngxLoaderService.stopLoader('loader-01');
            this.toastrService.success(
              'Em alguns instantes o administrador irá receber um e-mail com instruções para ativação da conta.',
              'Administrador cadastrado'
            );
            this.router.navigateByUrl('/administradores');
          },
          error: (err: HttpErrorResponse) => {
            this.ngxLoaderService.stopLoader('loader-01');
            this.toastrService.error(
              err.error.message ?? 'Por favor, tente novamente mais tarde.',
              'Não foi possível cadastrar o administrador'
            );
          },
        });
    } else {
      this.ngxLoaderService.stopLoader('loader-01');
      this.toastrService.warning(
        'Por favor, preenecha todos os campos corretamente',
        'Dados incorretos'
      );
    }
  }

  navigate(): void {
    this.router.navigateByUrl('/administradores');
  }
}
