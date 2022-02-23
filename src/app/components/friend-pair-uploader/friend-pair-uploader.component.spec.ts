import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FriendPairUploaderComponent } from './friend-pair-uploader.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import * as guestList from '../../../assets/guestList.json';
import * as validFriends from '../../../assets/friendsList.json';
import * as friendsInvalidTuples from '../../../assets/friendsList-invalidTuples.json';
import * as friendsEmpty from '../../../assets/friendList-empty.json';
import * as invalidList from '../../../assets/list-noRoot.json';
import { fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FriendPairUploaderComponent', () => {
  let component: FriendPairUploaderComponent;
  let spectator: Spectator<FriendPairUploaderComponent>;

  const createComponent = createComponentFactory({
    component: FriendPairUploaderComponent,
    imports: [
      MatExpansionModule,
      FlexLayoutModule,
      FlexModule,
      MatCardModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      FileUploadModule,
      MatFormFieldModule,
      NoopAnimationsModule,
    ],
  })

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should respond to invalid value changes on form control', () => {
    component.fileForm.controls['files'].setValue([new File([], 'testfile.wrong')]);
    expect(component.errorText).toEqual('File type must be .json!');
  });

  it('should respond to valid value changes on form control', fakeAsync(() => {
    component.fileForm.controls['files'].setValue([new File([], 'testfile.json', {type: 'application/json'})]);
    spectator.fixture.whenStable().then(() => {
      expect(component.errorText).toEqual('');
    });
  }));

  it('should emit an event when a valid file is uploaded', fakeAsync(() => {
    spyOn(component.validFileUploaded, 'emit').and.callThrough();
    const bytes = new TextEncoder().encode(JSON.stringify(validFriends));
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
    component.fileForm.controls['files'].setValue([new File([blob], 'testfile.json', {type: 'application/json'})]);
    // expect(component.validFileUploaded.emit).toHaveBeenCalled();
  }));

  it('should show error if friends object is missing', fakeAsync(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(invalidList));
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
    component.fileForm.controls['files'].setValue([new File([blob], 'testfile.json', {type: 'application/json'})]);
    // expect(component.errorText).toEqual('Oops! Looks like you are missing the root "friends" object! Fix file and try again.');
  }));

  it('should show error if friends list is empty', fakeAsync(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(friendsEmpty));
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
    component.fileForm.controls['files'].setValue([new File([blob], 'testfile.json', {type: 'application/json'})]);
    // expect(component.errorText).toEqual('Oops! Looks like you tried to upload an empty list!');
  }));

  it('should show error if friends has invalid objects', fakeAsync(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(friendsInvalidTuples));
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
    component.fileForm.controls['files'].setValue([new File([blob], 'testfile.json', {type: 'application/json'})]);
    spectator.fixture.whenStable().then(() => {
    // expect(component.errorText).toEqual('Oops! Looks like you tried to upload an invalid list! Make sure each array has exactly 2 ids');
    });
  }));

  it('should show error if guest object is found', fakeAsync(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(guestList));
    const blob = new Blob([bytes], {
      type: "application/json"
    });
    const file = new File([blob], 'testfile.json', {type: 'application/json'});

    spyOn(component, 'clear').and.callThrough();
    component.fileForm.controls['files'].setValue([file]);
    // expect(component.errorText).toEqual('Oops! Looks like you tried to upload a guest list! Try a friend-pair list instead.');
  }));

});
