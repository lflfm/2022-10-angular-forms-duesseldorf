import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private registeredUsernames = [
    'user', 'name', 'username', 'janedoe', 'sebastian', 'ferdinand'
  ];

  checkUsername(username: string): Observable<{ usernameAvailable: boolean }> {
    console.log(`[DATASERVICE] checkUsername(${username})`);
    return timer(1000).pipe(
      map(() => !this.registeredUsernames.includes(username)),
      map(available => ({ usernameAvailable: available }))
    );

  }
}
