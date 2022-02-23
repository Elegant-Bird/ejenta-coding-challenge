import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IGuest } from '../interfaces/i-guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private _http: HttpClient) { }

  public getGuestList(): Observable<IGuest [] | null> {
    return this._http.get('assets/guestList.json')
    .pipe(
      map((json: {guests?: IGuest []}) => {
        return json?.guests || null;
      })
    );
  }
}
