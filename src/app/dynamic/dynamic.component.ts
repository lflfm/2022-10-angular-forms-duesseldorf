import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AsyncValidatorService } from '../async-validator.service';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent {

  form = new FormGroup({});

  model = {
    username: 'ferdinand',
    password: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      props: {
        label: 'Benutzername',
        placeholder: 'Hier Name eingeben',
        required: true
      },
      asyncValidators: {
        validation: [this.av.usernameAvailable()]
      }
    },
    {
      key: 'password',
      type: 'input',
      props: {
        type: 'password',
        label: 'passwort',
        description: 'Passwort muss mindestens 8 Zeichen lang sein.',
        required: false
      },
      validators: {
        validation: [Validators.minLength(8)]
      }
    }
  ];

  constructor(private av: AsyncValidatorService) {}
}
