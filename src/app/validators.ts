import { FormGroup, ValidatorFn, Validators } from '@angular/forms';


export const myTestValidator1: ValidatorFn = function (control) {
  return {
    myerrorcode: { foo: 'bar' }
  };
}


export const myTestValidator = function (param1: string, param2: number): ValidatorFn {
  return (control) => {
    return { myerrorcode: { param1, param2 } };
  }
}

export const onlyLetters = Validators.pattern(/^[a-zA-Z\ ]*$/);

export function onlyLetters2(): ValidatorFn {
  return Validators.pattern(/^[a-zA-Z\ ]*$/);
}


export const usernameLength = Validators.compose([
  Validators.minLength(3),
  Validators.maxLength(32)
])!; // Non-Null Assertion

export const usernameLength2 = Validators.compose([
  Validators.minLength(3),
  Validators.maxLength(32),
]) ?? Validators.nullValidator; // Fallback mit neutralem Validator

export function lengthRange(min: number, max: number) {
  return Validators.compose([
    Validators.minLength(min),
    Validators.maxLength(max),
  ]) ?? Validators.nullValidator;
}


// Aufgabe: Validator exactValue(value) implementieren
// Fehler ausgeben, wenn nicht exakt der Wert im Control steht
// Inhalt des Fehlers: dürft ihr selbst festlegen! :-)
export const exactValue = function(requiredValue: string): ValidatorFn {
  return control => {
    if (control.value === requiredValue) {
      return null;
    } else {
      return {
        exactvalue: {
          actualValue: control.value,
          requiredValue
        }
      };
    }
    // return control.value === requiredValue ? null : { exactvalue: true };
  }
}
