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
      ],
      asyncValidators: [this.av.usernameAvailable()],
      updateOn: 'submit'
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        onlyLetters
      ]
    }),
    tags: new FormArray([
      this.createTagControl(),
      this.createTagControl(),
      this.createTagControl(),
    ]),
    addresses: new FormArray([
      this.createAddressGroup(),
      this.createAddressGroup(),
      this.createAddressGroup(),
    ]),
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

  private createAddressGroup() {
    return new FormGroup({
      street: new FormControl('', { nonNullable: true }),
      city: new FormControl('', { nonNullable: true }),
    });
  }

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

  addTagControl() {
    this.userForm.controls.tags.push(
      this.createTagControl()
    );
  }

  private createTagControl() {
    return new FormControl('', { nonNullable: true });
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
