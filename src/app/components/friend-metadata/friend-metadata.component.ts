import { Component, Input } from '@angular/core';
import { IGuest, IGuestFriends } from '../../interfaces/i-guest';
import { MINIMUM_KNOWN_FRIENDS } from '../home-page/home-page.component';

@Component({
  selector: 'app-friend-metadata',
  templateUrl: './friend-metadata.component.html',
  styleUrls: ['./friend-metadata.component.scss']
})
export class FriendMetadataComponent {
  private _guestList: IGuest [] = [];
  private _popularPeople: IGuestFriends [] = [];
  private _associatedFriends: IGuestFriends [] = [];
  private _minFriends: number = MINIMUM_KNOWN_FRIENDS;
  @Input() set minimumKnownFriends(count: number) {
    this._minFriends = count;
    this._popularPeople = this.removeUnpopularPeople();
  }

  @Input() set guestList(guestList: IGuest []) {
    this._guestList = guestList;
  }

  @Input() set associatedFriends(associatedFriends: IGuestFriends []) {
    this._associatedFriends = associatedFriends;
    this._popularPeople = this.removeUnpopularPeople();
  }

  public get guestList(): IGuest [] {
    return this._guestList;
  }

  public get popularPeople(): IGuestFriends [] {
    return this._popularPeople;
  }

  public get associatedFriends(): IGuestFriends [] {
    return this._associatedFriends;
  }

  public get minimumKnownFriends(): number {
    return this._minFriends;
  }

  public getDisplayName(guest: IGuest): string {
    return `${guest.firstName} ${guest.lastName}`;
  }

  public removeUnpopularPeople(): IGuestFriends [] {
    return this.associatedFriends.filter(person => person.friends.length >= this.minimumKnownFriends);
  }
}
