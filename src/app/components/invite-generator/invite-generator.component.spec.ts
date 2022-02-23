import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { InviteGeneratorComponent } from './invite-generator.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MINIMUM_KNOWN_FRIENDS } from '../home-page/home-page.component';
import { IGuestFriends } from '../../interfaces/i-guest';

describe('InviteGeneratorComponent', () => {
  let component: InviteGeneratorComponent;
  let spectator: Spectator<InviteGeneratorComponent>;

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
    component: InviteGeneratorComponent,
    imports: [
      MatCardModule,
      FlexLayoutModule,
      FlexModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      FileUploadModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
    ],
  })

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow the associated friends to be set', () => {
    spyOn(component, 'removeUnpopularPeople').and.callThrough();
    component.associatedFriends = sampleAsscFriends;
    expect(component.removeUnpopularPeople).toHaveBeenCalled();
  })

  it('should allow the invite list to be generated', () => {
    spyOn(component, 'removeUnpopularPeople').and.callThrough();
    spyOn(component.listGenerated, 'emit').and.callThrough();
    component.associatedFriends = sampleAsscFriends;
    component.generateInviteList();
    expect(component.listGenerated.emit).toHaveBeenCalled();

  });

  it('should do nothing if no popular people exist', () => {
    spyOn(component, 'removeUnpopularPeople').and.callThrough();
    spyOn(component.listGenerated, 'emit').and.callThrough();
    component.associatedFriends = [];
    component.generateInviteList();
    expect(component.listGenerated.emit).not.toHaveBeenCalled();
  });

  it('should have a form control for min friends known', () => {
    expect(component.minimumKnownFriends).toBeTruthy();
    expect(component.minimumKnownFriends.value).toBe(MINIMUM_KNOWN_FRIENDS);
  });

  it('should emit an event when the known friend count is changed', () => {
    spyOn(component.minimumFriendsChanged, 'emit').and.callThrough();
    component.minimumKnownFriends.setValue(5);
    expect(component.minimumFriendsChanged.emit).toHaveBeenCalledWith(5);
  });

});
