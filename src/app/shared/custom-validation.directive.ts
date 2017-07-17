import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validatePhoneFactory() {
  return (c: FormControl) => {
    let PHONE_REGEXP = /(201)[0-9]{9}/i;

    return PHONE_REGEXP.test(c.value) ? null : {
      validatePhone: {
        valid: false
      }
    };
  };
}

@Directive({
  selector: '[validatePhone][ngModel],[validatePhone][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneValidator), multi: true }
  ]
})
export class PhoneValidator {

  validator: Function;

  constructor() {
    this.validator = validatePhoneFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}