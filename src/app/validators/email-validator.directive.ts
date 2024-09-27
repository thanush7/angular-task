import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidatorDirective,
    multi: true
  }]
})
export class EmailValidatorDirective  {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Basic email regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@kgisl\.[a-zA-Z]{2,}$/;

    if (value && !emailPattern.test(value)) {
      return { 'emailValidator': true };
    }
    return null;
  }

}
