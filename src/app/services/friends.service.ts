import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IFriend } from '../interfaces/i-friend';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private _http: HttpClient) { }

  public getFriendsList(): Observable<IFriend [] | null> {
    return this._http.get('assets/friendsList.json')
    .pipe(
      map((json: {friends?: IFriend []}) => {
        return json?.friends || null;
      })
    );
  }
}
