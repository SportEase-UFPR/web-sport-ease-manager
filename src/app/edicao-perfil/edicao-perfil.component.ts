import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AdmService } from '../shared/services/adm/adm.service';
import { Adm } from '../shared/models/adm/adm.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdmAlteracaoRequest } from '../shared/models/adm/adm-alteracao-request.model';
import { AdmAlteracaoResponse } from '../shared/models/adm/adm-alteracao-response.model';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { ValidacoesForm } from '../utils/validacoes-form';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edicao-perfil',
  templateUrl: './edicao-perfil.component.html',
  styleUrls: ['./edicao-perfil.component.scss'],
})
export class EdicaoPerfilComponent implements OnInit, OnDestroy {
  public formAlteracaoPerfil: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cpf: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
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
  adm!: Adm;

  senha$ = new Subject();
  confirmacaoSenha$ = new Subject();

  constructor(
    private router: Router,
    private admService: AdmService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.admService
      .getAdm()
      .pipe(take(1))
      .subscribe({
        next: (result: Adm) => {
          this.adm = result;
          this.formAlteracaoPerfil.patchValue({
            nome: this.adm.nome,
            email: this.adm.email,
            cpf: this.adm.cpf,
          });
        },
        error: (err) => {
          console.error(err);
        },
      });

    this.formAlteracaoPerfil
      .get('senha')
      ?.valueChanges.pipe(takeUntil(this.senha$))
      .subscribe(() => this.verificarSenhas());

    this.formAlteracaoPerfil
      .get('confirmacaoSenha')
      ?.valueChanges.pipe(takeUntil(this.confirmacaoSenha$))
      .subscribe(() => this.verificarSenhas());
  }

  verificarSenhas() {
    const result = ValidacoesForm.senhasValid(
      this.formAlteracaoPerfil.get('senha')!,
      this.formAlteracaoPerfil.get('confirmacaoSenha')!,
      this.passwordChecklist
    );
    this.passwordChecklist = result;
    this.senhasDiferentes = result;
  }

  ngOnDestroy(): void {
    this.senha$.next(null);
    this.confirmacaoSenha$.next(null);
    this.senha$.complete();
    this.confirmacaoSenha$.complete();
  }

  focusPassword() {
    this.passwordChecklist = true;
  }

  navigate(): void {
    this.router.navigateByUrl('/dashboard');
  }

  alterarDados(): void {
    this.ngxService.startLoader('loader-01');
    const form = this.formAlteracaoPerfil;
    const nome = form.get('nome')?.value;
    const email = form.get('email')?.value;
    const senha = form.get('senha')?.value;
    if (nome !== this.adm.nome || email !== this.adm.email || senha) {
      const dadosCliente: AdmAlteracaoRequest = new AdmAlteracaoRequest(
        nome,
        email,
        senha ? senha : null
      );

      this.admService
        .atualizarDados(dadosCliente)
        .pipe(take(1))
        .subscribe({
          next: (result: AdmAlteracaoResponse) => {
            this.ngxService.stopLoader('loader-01');

            if (email !== this.adm.email) {
              this.openModal(email);
            } else {
              this.toastrService.success(
                'Dados alterados com sucesso',
                'Sucesso!'
              );
              this.router.navigateByUrl('/dashboard');
            }
          },
          error: (err) => {
            this.ngxService.stopLoader('loader-01');
            this.toastrService.error(
              'Não foi possível atualziar o cadastro. Tente novamente mais tarde',
              'Falha ao atualziar os dados'
            );
          },
        });
    } else {
      this.ngxService.stopLoader('loader-01');
      this.toastrService.info(
        'Por favor, forneca pelo menos um dado que deseja atualziar',
        'Nenhum dado para atualizar'
      );
    }
  }

  openModal(email: string): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent, {
      centered: true,
    });

    modalRef.componentInstance.email = email;
  }
}
