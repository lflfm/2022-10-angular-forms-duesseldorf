import { ValidatorFn } from "@angular/forms";

export const myTestValidator1: ValidatorFn = function(control) {
  return {
    // myerrorcode: { foo:'bar' }, // this is what we get with the getError method
    myerrorcode: true,
  };
}

export const myTestValidatorFactory = function(param1: string, param2: number): ValidatorFn {
  return function(control) {
    return {
      myothererrorcode: {param1, param2},
    };
  }
}