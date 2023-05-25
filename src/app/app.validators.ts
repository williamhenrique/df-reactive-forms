import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { EMPTY, filter, map, of } from "rxjs";

export class AppValidators {
  static checkIsNumber(control: AbstractControl){
    const isNumber = /^[-]?\d+$/.test(control.value);
    if(!isNumber){
      return {
        isNumberError: true
      }
    }
    return {}
  }

  static checkValidCountryNumber(control: AbstractControl){
    const age = control.get('age')?.value as number;
    const email = control.get('email')?.value as string;
    const domain = email.split('@').reverse()[0];

    if(domain === 'live.com' && age < 18){
      return {
        errorAgeDomain: true
      }
    }

    return {}
  }

  static checkDomainExist(): AsyncValidatorFn{
    return (control: AbstractControl) => {
      const email = control.value;
      if(email === undefined){
        return of({
        })
      }

      const domain = email.split('@').reverse()[0];

      return of('live.com').pipe(
        filter(value => value !== domain),
        map(value => {
          return {
            domainInvalid: true
          }
        })
      );
    }

  }

}
