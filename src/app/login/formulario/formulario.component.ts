import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit, OnDestroy {
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    senha: new FormControl(null, [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    document.body.classList.add('display-login');
  }

  ngOnDestroy(): void {
      document.body.classList.remove('display-login')
  }

  entrar() {}
}
