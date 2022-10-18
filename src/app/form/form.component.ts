import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormRecord } from '@angular/forms';
import { AsyncValidatorService } from '../async-validator.service';
import { exactValue, myTestValidator, onlyLetters, passwordsMatch, usernameLength } from '../validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  challengeString = 'Katze';

  userForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        usernameLength
        // myTestValidator('eins', 2)
      ]
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        onlyLetters
      ]
    }),
    password: new FormGroup({
      pw1: new FormControl('', { nonNullable: true, validators: [Validators.minLength(3)] }),
      pw2: new FormControl('', { nonNullable: true, validators: [Validators.minLength(3)] }),
    }, [passwordsMatch]),
    confirm: new FormControl('', {
      nonNullable: true,
      validators: [
        exactValue(this.challengeString)
      ]
    })
  });

  constructor(private av: AsyncValidatorService) {}

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    // return (control?.invalid && control?.touched) ?? false;
    // return control ? (control.invalid && control.touched) : false;
    return !!control && control.invalid && control.touched;
  }

  hasError(controlName: string, errorCode: string): boolean {
    // "Hat ein bestimmtes Control einen bestimmten Error?"
    const control = this.userForm.get(controlName);
    return !!control && control.hasError(errorCode) && control.touched; // (control.touched || control.dirty);
  }


  submitForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    // optionale Idee:
    // this.formDisabled = true;
    // im Template: [disabled]="formDisabled"

    const formValue = this.userForm.getRawValue();
    console.log('SUBMIT', formValue);
  }
}
