import { Component } from '@angular/core';
import { FriendsService } from '../../services/friends.service';
import { GuestService } from '../../services/guest-service.service';
import { IFriend } from '../../interfaces/i-friend';
import { IGuest, IGuestFriends } from '../../interfaces/i-guest';
import * as _ from 'lodash';

export const MINIMUM_KNOWN_FRIENDS = 5;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public associatedFriends: IGuestFriends[] = [];
  private _friendsList!: IFriend[];
  private _guestList!: IGuest[];
  private _minFriends: number = 0;

  public set minFriends(count: number) {
    this._minFriends = count;
  }

  public set friendsList(friends: IFriend[]) {
    this._friendsList = friends;
    this.getAssociations();
  }

  public set guestList(guests: IGuest[]) {
    this._guestList = guests;
    this.getAssociations();
  }

  constructor(
    private guestService: GuestService,
    private friendService: FriendsService
  ) {
    this.guestService
      .getGuestList()
      .subscribe((data) => (this.guestList = data || []));
    this.friendService
      .getFriendsList()
      .subscribe((data) => (this.friendsList = data || []));
       this.minFriends = MINIMUM_KNOWN_FRIENDS;
  }


  public get friendsList(): IFriend[] {
    return this._friendsList;
  }

  public get guestList(): IGuest[] {
    return this._guestList;
  }

  public get minFriends(): number {
    return this._minFriends;
  }

  private getAssociations(): void {
    this.associatedFriends = [];
    if (!this.friendsList?.length || !this.guestList?.length) {
      return;
    }

    const allFriends = this.groupFriendsById(0).concat(
      this.groupFriendsById(1)
    );
    const allAssociatedFriends = _.groupBy(
      allFriends,
      (friend) => friend.primary.id
    );
    this.associatedFriends = this.normalizeAssociatedFriends(allAssociatedFriends);
  }

  private normalizeAssociatedFriends(groupedFriends: _.Dictionary<[IGuestFriends, ...IGuestFriends[]]>): IGuestFriends [] {
    const normalized: IGuestFriends [] = [];
    const usersIds = Object.keys(groupedFriends);
    usersIds.forEach(userId => {
      let knownPeople: IGuest [] = [];
      const data = groupedFriends[userId];
      let primary = data[0].primary;
      data.forEach(guestFriend => {
        knownPeople.push(...guestFriend.friends);
      });

      normalized.push({primary, friends: knownPeople});
    });

    return normalized;
  }

  private groupFriendsById(friendIndex: 0 | 1): IGuestFriends[] {
    const opposingIndex = friendIndex === 0 ? 1 : 0;
    const groupedFriends = _.groupBy(
      this.friendsList,
      (x) => x.ids[friendIndex]
    );
    const knownPeople: IGuestFriends[] = [];
    const keys = Object.keys(groupedFriends);
    keys.forEach((friendId) => {
      const guestsFriends = this.getGuestsFriends(
        +friendId,
        groupedFriends,
        opposingIndex
      );
      if (guestsFriends) {
        knownPeople.push(guestsFriends);
      }
    });

    return knownPeople;
  }

  private getGuestsFriends(
    guestId: number,
    groupedFriends: _.Dictionary<[IFriend, ...IFriend[]]>,
    friendIndex: number
  ): IGuestFriends | null {
    const primary = this.guestList.find((x) => x.id === guestId);
    const primariesFriends = groupedFriends[guestId];
    let friends: IGuest[] = [];

    primariesFriends.forEach((friend) => {
      const matchingGuest = this.guestList.find(
        (x) => x.id === friend.ids[friendIndex]
      );
      if (matchingGuest) {
        friends.push(matchingGuest);
      }
    });

    if (primary && friends.length > 0) {
      return { primary, friends };
    }

    return null;
  }
}
