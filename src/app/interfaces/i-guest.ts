export interface IGuest {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IGuestFriends {
  primary: IGuest;
  friends: IGuest [];
}
