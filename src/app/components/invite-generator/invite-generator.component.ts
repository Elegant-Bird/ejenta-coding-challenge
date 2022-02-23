import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGuest, IGuestFriends } from '../../interfaces/i-guest';
import { MINIMUM_KNOWN_FRIENDS } from '../home-page/home-page.component';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-invite-generator',
  templateUrl: './invite-generator.component.html',
  styleUrls: ['./invite-generator.component.scss']
})
export class InviteGeneratorComponent {
  public minimumKnownFriends = new FormControl();

  private _associatedFriends: IGuestFriends [] = [];
  private _popularPeople: IGuestFriends [] = [];
  private _inviteList: IGuest[] = [];

  @Output() public listGenerated: EventEmitter<IGuest []> = new EventEmitter<IGuest []>();
  @Output() public minimumFriendsChanged: EventEmitter<number> = new EventEmitter<number>();

  @Input() set associatedFriends(associatedFriends: IGuestFriends []) {
    this._associatedFriends = associatedFriends;
    this._popularPeople = this.removeUnpopularPeople();
  }
  public set inviteList(guests: IGuest[]) {
    this._inviteList = guests;
  }

  public get inviteList(): IGuest[] {
    return this._inviteList;
  }

  public get popularPeople(): IGuestFriends [] {
    return this._popularPeople;
  }

  constructor() {
    this.minimumKnownFriends.valueChanges.subscribe(val => {
      this.minimumFriendsChanged.emit(val);
      this._popularPeople = this.removeUnpopularPeople();
    });
    this.minimumKnownFriends.setValue(MINIMUM_KNOWN_FRIENDS);
   }

   public removeUnpopularPeople(): IGuestFriends [] {
     if (!this._associatedFriends || this._associatedFriends.length === 0) {
       return [];
     }
    return this._associatedFriends.filter(person => person.friends.length >= this.minimumKnownFriends.value);
  }

  public generateInviteList(): void {
    if (!this.popularPeople.length) {
      return;
    }

    console.log('got people');

    const wellKnownGuests: IGuest [] = [];

    this.popularPeople.forEach(person => {
      let popularFriends = 0;
      person.friends.forEach(friend => {
        if (this.isPersonPopular(friend)) {
          popularFriends++;
          wellKnownGuests.push(friend);
        }
      });
      if (popularFriends >= this.minimumKnownFriends.value) {
        wellKnownGuests.push(person.primary);
      }
    });

    this.inviteList = this.getCoolPeopleToInvite(wellKnownGuests);
    this.listGenerated.emit(this.inviteList);

  }

  private getCoolPeopleToInvite(wellKnownGuests: IGuest[]): IGuest [] {
    const groupedGuests = _.groupBy(wellKnownGuests, x => x.id);
    const ids = Object.keys(groupedGuests);
    const inviteList: IGuest [] = [];
    ids.forEach(id => {
      console.log(groupedGuests[+id].length , this.minimumKnownFriends.value);
      if (groupedGuests[+id].length >= this.minimumKnownFriends.value) {
        inviteList.push(groupedGuests[id][0]);
        console.log(inviteList);
      }
    });
    console.log(inviteList);

    return inviteList;
  }

  private isPersonPopular(guest: IGuest): boolean {
    return this.popularPeople.some(x => x.primary.id == guest.id);
  }
}
