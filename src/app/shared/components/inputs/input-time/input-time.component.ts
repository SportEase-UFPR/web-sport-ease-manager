import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
})
export class InputTimeComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = '--:--';
  @Input() label: string = '';
  @Input() validacaoInput: boolean = false;
  @Input() haveMinTime: boolean = false;
  @Input() minTime!: string;
  @Input() haveMaxTime: boolean = false;
  @Input() maxTime!: string;

  faClock = faClock;

  myTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#ffffff',
      buttonColor: '#5d5fef',
    },
    dial: {
      dialBackgroundColor: '#5d5fef',
      dialActiveColor: '#ffffff',
      dialEditableActiveColor: '#ffffff',
      dialEditableBackgroundColor: '5d5fef',
      dialInactiveColor: '#ffffff',
    },
    clockFace: {
      clockFaceBackgroundColor: '#b5b4b454',
      clockHandColor: '#5d5fef',
      clockFaceTimeInactiveColor: '#151d48',
      clockFaceInnerTimeInactiveColor: '#151d48',
    },
  };

  constructor() {}

  ngOnInit(): void {}
  
  inputValid(): boolean {
    return ValidacoesForm.inputInvalid(
      this.formGroup,
      this.controlName,
      this.validacaoInput
    );
  }
}
