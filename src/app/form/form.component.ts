import { asNativeElements, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AsyncValidatorService } from '../async-validator.service';
import { challengeStringValidator, myTestValidator1, myTestValidatorFactory } from '../validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  challengeString = 'Katze';

  userForm = new FormGroup({
    username: new FormControl('', { nonNullable: true,
     validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
      myTestValidator1,
      myTestValidatorFactory('foo', 42),
    ],
    }),
    name: new FormControl('', { nonNullable: true,
     validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
      Validators.pattern(/^[a-zA-Z]*$/),
     ], }),
    password: new FormGroup({
      pw1: new FormControl('', { nonNullable: true }),
      pw2: new FormControl('', { nonNullable: true })
    }),
    confirm: new FormControl('', { nonNullable: true,
     validators: [
      challengeStringValidator(this.challengeString),
     ], }),
  });

  constructor(private av: AsyncValidatorService) {}

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    if (!control) return false;
    return control.invalid && (control.dirty || control.touched);
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.userForm.get(controlName);
    if (!control) return false;
    if (!(control.dirty || control.touched) ) return false;
    return control.hasError(errorCode);
  }

  submitForm() {
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
      return;
    }
    const formValue = this.userForm.value;
    const formValueRaw = this.userForm.getRawValue();
    console.debug(`submitted: ${formValue}`);
    console.debug(`submitted: ${formValueRaw}`);
  }
}
