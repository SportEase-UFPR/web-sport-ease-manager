import { AbstractControl, FormArray, ValidatorFn } from "@angular/forms";

export class FormEspacoValidation {
  static requiredMinCheckbox(min: number = 1) {
    const validador: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalChecked = formArray.controls
          ?.map((v) => v.value)
          .reduce((sum, current) => (current ? sum + current : sum), 0);

        return totalChecked >= min ? null : { required: true };
      }

      throw new Error('formArray is not an instance of FormArray');
    };

    return validador;
  }
}
