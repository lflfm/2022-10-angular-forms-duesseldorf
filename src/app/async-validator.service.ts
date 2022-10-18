import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorService {

  constructor(private ds: DataService) {}

  usernameAvailable(): AsyncValidatorFn {
    return (control) => {
      const username = control.value;
      return this.ds.checkUsername(username).pipe(
        map(res => {
          if (res.usernameAvailable) {
            return null;
          } else {
            return { usernameavailable: true };
          }
        })
      );
    };
  }
}
