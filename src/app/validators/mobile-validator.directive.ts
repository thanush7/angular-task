import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMobileValidator]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MobileValidatorDirective,
    multi: true
  }]
})
export class MobileValidatorDirective {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Regex pattern for validating Indian mobile numbers (10 digits)
    const mobilePattern = /^[6-9]\d{9}$/;

    if (value && !mobilePattern.test(value)) {
      return { 'mobileValidator': true };
    }
    return null;
  }

}
