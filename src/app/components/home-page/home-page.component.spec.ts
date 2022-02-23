import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { HomePageComponent } from './home-page.component';
import { PeopleUploaderComponent } from '../people-uploader/people-uploader.component';
import { FriendPairUploaderComponent } from '../friend-pair-uploader/friend-pair-uploader.component';
import { InviteGeneratorComponent } from '../invite-generator/invite-generator.component';
import { FriendMetadataComponent } from '../friend-metadata/friend-metadata.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { GuestService } from '../../services/guest-service.service';
import { FriendsService } from '../../services/friends.service';
import { of } from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let spectator: Spectator<HomePageComponent>;

  const createComponent = createComponentFactory({
    component: HomePageComponent,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatExpansionModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      FlexModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      FileUploadModule,
    ],
    declarations: [
      PeopleUploaderComponent,
      FriendPairUploaderComponent,
      InviteGeneratorComponent,
      FriendMetadataComponent
    ],
    providers: [
      mockProvider(GuestService, {
        getGuestList: jasmine.createSpy().and.returnValue(of( [
          {
            "id": 1,
            "firstName": "BoJack",
            "lastName": "Horseman"
          },
          {
            "id": 2,
            "firstName": "Sarah",
            "lastName": "Lynn"
          },
          {
            "id": 3,
            "firstName": "Todd",
            "lastName": "Chavez"
          },
          {
            "id": 4,
            "firstName": "Dianne",
            "lastName": "Nguyen"
          },
          {
            "id": 5,
            "firstName": "Mr.",
            "lastName": "Peanutbutter"
          },
          {
            "id": 6,
            "firstName": "Princess",
            "lastName": "Carolyn"
          },
          {
            "id": 7,
            "firstName": "Wanda",
            "lastName": "Pierce"
          },
          {
            "id": 8,
            "firstName": "Kelsey",
            "lastName": "Jannings"
          },
          {
            "id": 9,
            "firstName": "Beatrice",
            "lastName": "Horseman"
          },
          {
            "id": 10,
            "firstName": "Pinky",
            "lastName": "Penguin"
          },
          {
            "id": 11,
            "firstName": "Charley",
            "lastName": "Witherspoon"
          },
          {
            "id": 12,
            "firstName": "Courtney",
            "lastName": "Portnoy"
          },
          {
            "id": 13,
            "firstName": "Michael",
            "lastName": "Morgan"
          },
          {
            "id": 14,
            "firstName": "Margo",
            "lastName": "Martindale"
          }
        ]))
      }),
      mockProvider(FriendsService, {
        getFriendsList: jasmine.createSpy().and.returnValue(of([    {
          "ids": [1, 2]
        },
        {
          "ids": [1, 3]
        },
        {
          "ids": [1, 4]
        },
        {
          "ids": [1, 5]
        },
        {
          "ids": [1, 6]
        },
        {
          "ids": [1, 9]
        },
        {
          "ids": [1, 11]
        },
        {
          "ids": [1, 14]
        },
        {
          "ids": [1, 12]
        }]))
      }),
    ]
  })

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the associations whenever the lists are updated', () => {

  });
});
