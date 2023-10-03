import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AdmService } from '../shared/services/adm/adm.service';
import { Adm } from '../shared/models/adm/adm.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdmAlteracaoRequest } from '../shared/models/adm-alteracao/adm-alteracao-request.model';
import { AdmAlteracaoResponse } from '../shared/models/adm-alteracao-response/adm-alteracao-response.model';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-edicao-perfil',
  templateUrl: './edicao-perfil.component.html',
  styleUrls: ['./edicao-perfil.component.scss'],
})
export class EdicaoPerfilComponent implements OnInit, OnDestroy {
  public formAlteracaoPerfil: FormGroup = new FormGroup({
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
  senhasDiferentes: boolean = false;
  passwordChecklist: boolean = false;
  focusPasswordType?: string;
  adm!: Adm;
  inscricaoAtualizacao!: Subscription;
  inscricaoCliente!: Subscription;

  constructor(
    private router: Router,
    private admService: AdmService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.inscricaoAtualizacao = this.admService.getAdm().subscribe({
      next: (result: Adm) => {
        console.log(result);
        this.adm = result;
        this.formAlteracaoPerfil.patchValue({
          nome: this.adm.nome,
          email: this.adm.email,
          cpf: this.maskCpf(this.adm.cpf!),
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngAfterContentChecked(): void {
    const senha = this.formAlteracaoPerfil.get('senha');
    const confirmacaoSenha = this.formAlteracaoPerfil.get('confirmacaoSenha');

    if (
      senha?.value === confirmacaoSenha?.value &&
      senha?.value !== null &&
      confirmacaoSenha?.value !== null &&
      senha?.value !== '' &&
      confirmacaoSenha?.value !== ''
    ) {
      this.senhasDiferentes = false;
      if (senha?.valid && confirmacaoSenha?.valid) {
        this.passwordChecklist = false;
      }
    } else {
      this.senhasDiferentes = true;
      if (
        !this.passwordChecklist &&
        (senha?.touched || confirmacaoSenha?.touched)
      ) {
        this.passwordChecklist = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.inscricaoAtualizacao?.unsubscribe();
    this.inscricaoCliente?.unsubscribe();
  }

  focusPassword() {
    this.passwordChecklist = true;
  }

  passwordValid(campo: string): boolean {
    if (
      this.formAlteracaoPerfil.controls[campo].hasError('required') ||
      this.formAlteracaoPerfil.controls[campo].hasError('minlength')
    ) {
      return true;
    }
    return false;
  }

  navigate(): void {
    this.router.navigateByUrl('/dashboard');
  }

  maskCpf(cpf: string): string {
    return (
      cpf.slice(0, 3) +
      '.' +
      cpf.slice(3, 6) +
      '.' +
      cpf.slice(6, 9) +
      '-' +
      cpf.slice(9)
    );
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

      this.inscricaoAtualizacao = this.admService
        .atualizarDados(dadosCliente)
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
