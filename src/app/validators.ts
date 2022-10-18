import { FormGroup, ValidatorFn } from '@angular/forms';


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
