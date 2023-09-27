import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
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
  senhasDiferentes: boolean = false;
  passwordChecklist: boolean = false;
  focusPasswordType?: string;
  isCadastro: boolean = true

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']){
        const id = params['id']
        this.isCadastro = false
      } else {
        this.isCadastro = true
      }
    })
  }

  ngAfterContentChecked(): void {
    const senha = this.formAdministrador.get('senha');
    const confirmacaoSenha = this.formAdministrador.get('confirmacaoSenha');

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
      if (!this.passwordChecklist) {
        this.passwordChecklist = true;
      }
    }
  }

  focusPassword() {
    this.passwordChecklist = true;
  }

  passwordValid(campo: string): boolean {
    if (
      this.formAdministrador.controls[campo].hasError('required') ||
      this.formAdministrador.controls[campo].hasError('minlength')
    ) {
      return true;
    }
    return false;
  }

  alterarDados(): void {}

  navigate(): void {
    this.router.navigateByUrl('/administradores')
  }
}
