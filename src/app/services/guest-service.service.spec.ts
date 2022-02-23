import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { GuestService } from './guest-service.service';

describe('GuestService', () => {
  let spectator: SpectatorHttp<GuestService>;
  const createService = createHttpFactory(GuestService);

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('getGuestList should make a call to get the local json file', () => {
    spectator.service.getGuestList().subscribe();
    spectator.expectOne('assets/guestList.json', HttpMethod.GET);
  });

  it('getFriendsList should return null if no list is found', () => {
    spectator.service.getGuestList().subscribe(data => {
      expect(data).toBeNull();
    });
    spectator.expectOne('assets/guestList.json', HttpMethod.GET).flush([]);
  });

  it('getFriendsList should return null if no response', () => {
    spectator.service.getGuestList().subscribe(data => {
      expect(data).toBeNull();
    });
    spectator.expectOne('assets/guestList.json', HttpMethod.GET).flush(null);
  });

  it('getFriendsList should return data', () => {
    spectator.service.getGuestList().subscribe(data => {
      expect(data).toEqual([]);
    });
    spectator.expectOne('assets/guestList.json', HttpMethod.GET).flush({guests: []});
  });
});
