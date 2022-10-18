import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormRecord } from '@angular/forms';
import { AsyncValidatorService } from '../async-validator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  userForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\ ]*$/) // nur Buchstaben
      ]
    }),
    password: new FormGroup({
      pw1: new FormControl('', { nonNullable: true }),
      pw2: new FormControl('', { nonNullable: true }),
    }),
    confirm: new FormControl('', { nonNullable: true })
  });

  constructor(private av: AsyncValidatorService) {}
}
