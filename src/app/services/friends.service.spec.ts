import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { FriendsService } from './friends.service';

describe('FriendsService', () => {
  let service: FriendsService;
  let spectator: SpectatorHttp<FriendsService>;
  const createService = createHttpFactory(FriendsService);

  beforeEach(() => {
    spectator = createService()
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFriendsList should make a call to get the local json file', () => {
    service.getFriendsList().subscribe();
    spectator.expectOne('assets/friendsList.json', HttpMethod.GET);
  });


  it('getFriendsList should return null if no list is found', () => {
    service.getFriendsList().subscribe(data => {
      expect(data).toBeNull();
    });
    spectator.expectOne('assets/friendsList.json', HttpMethod.GET).flush([]);
  });

  it('getFriendsList should return null if no response', () => {
    service.getFriendsList().subscribe(data => {
      expect(data).toBeNull();
    });
    spectator.expectOne('assets/friendsList.json', HttpMethod.GET).flush(null);
  });

  it('getFriendsList should return data', () => {
    service.getFriendsList().subscribe(data => {
      expect(data).toEqual([]);
    });
    spectator.expectOne('assets/friendsList.json', HttpMethod.GET).flush({friends: []});
  });
});
