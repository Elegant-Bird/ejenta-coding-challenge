import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FriendMetadataComponent } from './friend-metadata.component';
import { IGuestFriends } from '../../interfaces/i-guest';

describe('FriendMetadataComponent', () => {
  let component: FriendMetadataComponent;
  let spectator: Spectator<FriendMetadataComponent>;

  const sampleAsscFriends: IGuestFriends[] = [
    {"primary":{"id":1,"firstName":"BoJack","lastName":"Horseman"},
    "friends":[{"id":2,"firstName":"Sarah","lastName":"Lynn"},
    {"id":3,"firstName":"Todd","lastName":"Chavez"},
    {"id":4,"firstName":"Dianne","lastName":"Nguyen"},
    {"id":5,"firstName":"Mr.","lastName":"Peanutbutter"},
    {"id":6,"firstName":"Princess","lastName":"Carolyn"},
    {"id":9,"firstName":"Beatrice","lastName":"Horseman"},
    {"id":11,"firstName":"Charley","lastName":"Witherspoon"},
    {"id":14,"firstName":"Margo","lastName":"Martindale"},
    {"id":12,"firstName":"Courtney","lastName":"Portnoy"}]},
    {"primary":{"id":2,"firstName":"Sarah","lastName":"Lynn"},"friends":[{"id":3,"firstName":"Todd","lastName":"Chavez"},{"id":4,"firstName":"Dianne","lastName":"Nguyen"},{"id":5,"firstName":"Mr.","lastName":"Peanutbutter"},{"id":6,"firstName":"Princess","lastName":"Carolyn"},{"id":7,"firstName":"Wanda","lastName":"Pierce"},{"id":1,"firstName":"BoJack","lastName":"Horseman"}]},{"primary":{"id":3,"firstName":"Todd","lastName":"Chavez"},"friends":[{"id":4,"firstName":"Dianne","lastName":"Nguyen"},{"id":5,"firstName":"Mr.","lastName":"Peanutbutter"},{"id":6,"firstName":"Princess","lastName":"Carolyn"},{"id":9,"firstName":"Beatrice","lastName":"Horseman"},{"id":12,"firstName":"Courtney","lastName":"Portnoy"},{"id":1,"firstName":"BoJack","lastName":"Horseman"},{"id":2,"firstName":"Sarah","lastName":"Lynn"}]},{"primary":{"id":4,"firstName":"Dianne","lastName":"Nguyen"},"friends":[{"id":5,"firstName":"Mr.","lastName":"Peanutbutter"},{"id":6,"firstName":"Princess","lastName":"Carolyn"},{"id":7,"firstName":"Wanda","lastName":"Pierce"},{"id":9,"firstName":"Beatrice","lastName":"Horseman"},{"id":14,"firstName":"Margo","lastName":"Martindale"},{"id":1,"firstName":"BoJack","lastName":"Horseman"},{"id":2,"firstName":"Sarah","lastName":"Lynn"},{"id":3,"firstName":"Todd","lastName":"Chavez"}]},{"primary":{"id":5,"firstName":"Mr.","lastName":"Peanutbutter"},"friends":[{"id":6,"firstName":"Princess","lastName":"Carolyn"},{"id":7,"firstName":"Wanda","lastName":"Pierce"},{"id":8,"firstName":"Kelsey","lastName":"Jannings"},{"id":12,"firstName":"Courtney","lastName":"Portnoy"},{"id":13,"firstName":"Michael","lastName":"Morgan"},{"id":14,"firstName":"Margo","lastName":"Martindale"},{"id":1,"firstName":"BoJack","lastName":"Horseman"},{"id":2,"firstName":"Sarah","lastName":"Lynn"},{"id":3,"firstName":"Todd","lastName":"Chavez"},{"id":4,"firstName":"Dianne","lastName":"Nguyen"}]},{"primary":{"id":6,"firstName":"Princess","lastName":"Carolyn"},"friends":[{"id":1,"firstName":"BoJack","lastName":"Horseman"},{"id":2,"firstName":"Sarah","lastName":"Lynn"},{"id":3,"firstName":"Todd","lastName":"Chavez"},{"id":4,"firstName":"Dianne","lastName":"Nguyen"},{"id":5,"firstName":"Mr.","lastName":"Peanutbutter"}]},{"primary":{"id":7,"firstName":"Wanda","lastName":"Pierce"},"friends":[{"id":2,"firstName":"Sarah","lastName":"Lynn"},{"id":4,"firstName":"Dianne","lastName":"Nguyen"},{"id":5,"firstName":"Mr.","lastName":"Peanutbutter"}]},
  ];

  const createComponent = createComponentFactory({
    component: FriendMetadataComponent,
    imports: [
      MatExpansionModule,
      FlexLayoutModule,
      FlexModule,
    ]
  })

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get/set minimumKnownFriends', () => {
    component.minimumKnownFriends = 4;
    expect(component.minimumKnownFriends).toBe(4);
  });
  it('should get/set guestList', () => {
    component.guestList = [{id: 1, firstName: 'test', lastName: 'last'}];
    expect(component.guestList.length).toBe(1);
  });
  it('should set/get associatedFriends and popularPeople', () => {
    spyOn(component, 'removeUnpopularPeople').and.callThrough();
    component.associatedFriends = sampleAsscFriends;
    expect(component.removeUnpopularPeople).toHaveBeenCalled();
  });

  it('should get a guests display name', () => {
    const text = component.getDisplayName({id: 1, firstName: 'test', lastName: 'last'});
    expect(text).toEqual('test last');
  });

  it('should remove unpopular people from a list', () => {
    const people = component.removeUnpopularPeople();
    expect(people.length).toBe(0);
  });
});
