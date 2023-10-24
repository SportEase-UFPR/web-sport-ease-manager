import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
})
export class InputTimeComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() validacaoInput: boolean = false;

  @Output() emitterChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get formControl(): AbstractControl {
    return this.formGroup?.controls[this.controlName] ?? new FormControl();
  }

  inputValid(): boolean {
    return ValidacoesForm.inputInvalid(
      this.formGroup,
      this.controlName,
      this.validacaoInput
    );
  }

  onChange(): void {
    this.emitterChange.emit();
  }
}
