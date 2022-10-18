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
    username: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    password: new FormGroup({
      pw1: new FormControl('', { nonNullable: true }),
      pw2: new FormControl('', { nonNullable: true }),
    }),
    confirm: new FormControl('', { nonNullable: true })
  });

  constructor(private av: AsyncValidatorService) {}
}
