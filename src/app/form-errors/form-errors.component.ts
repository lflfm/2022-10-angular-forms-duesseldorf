import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {

  @Input() controlName?: string;

  constructor(private formgroup: FormGroupDirective) { }

  get errors(): string[] {
    if (!this.controlName) {
      return [];
    }

    const control = this.formgroup.control.get(this.controlName);

    if (!control || !control.errors) {
      return [];
    }

    return Object.keys(control.errors).map(errorCode => {
      switch (errorCode) {
        case 'minlength': return 'minlengthError';
        case 'maxlength': return 'maxLengthError';
        default: return errorCode;
      }
    })
  }

  ngOnInit(): void {
  }

}
