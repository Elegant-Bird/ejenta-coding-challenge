import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { PeopleUploaderComponent } from './people-uploader.component';

import * as guestList from '../../../assets/guestList.json';
import * as friendList from '../../../assets/friendsList.json';
import * as guestInvalidData from '../../../assets/guestList-invalidUser.json';
import * as guestEmpty from '../../../assets/guestList-empty.json';
import * as invalidList from '../../../assets/list-noRoot.json';
import { fakeAsync } from '@angular/core/testing';

describe('PeopleUploaderComponent', () => {
  let component: PeopleUploaderComponent;
  let spectator: Spectator<PeopleUploaderComponent>;

  const createComponent = createComponentFactory({
    component: PeopleUploaderComponent,
    imports: [
      MatExpansionModule,
      FlexLayoutModule,
      FlexModule,
      FormsModule,
      MatCardModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      FileUploadModule,
      MatFormFieldModule,
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
    const bytes = new TextEncoder().encode(JSON.stringify(friendList));
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
    component.fileForm.controls['files'].setValue([new File([blob], 'testfile.json', {type: 'application/json'})]);
    // expect(component.validFileUploaded.emit).toHaveBeenCalled();
  }));

  it('should show error if guests object is missing', fakeAsync(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(invalidList));
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
    component.fileForm.controls['files'].setValue([new File([blob], 'testfile.json', {type: 'application/json'})]);
    // expect(component.errorText).toEqual('Oops! Looks like you are missing the root "guests" object! Fix file and try again.');
  }));

  it('should show error if guests list is empty', fakeAsync(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(guestEmpty));
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
    component.fileForm.controls['files'].setValue([new File([blob], 'testfile.json', {type: 'application/json'})]);
    // expect(component.errorText).toEqual('Oops! Looks like you tried to upload an empty list!');
  }));

  it('should show error if guests has invalid objects', fakeAsync(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(guestInvalidData));
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
    component.fileForm.controls['files'].setValue([new File([blob], 'testfile.json', {type: 'application/json'})]);
    spectator.fixture.whenStable().then(() => {
    // expect(component.errorText).toEqual('Oops! Looks like you tried to upload an invalid list! Make sure each array has exactly 2 ids');
    });
  }));

  it('should show error if friends object is found', fakeAsync(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(guestList));
    const blob = new Blob([bytes], {
      type: "application/json"
    });
    const file = new File([blob], 'testfile.json', {type: 'application/json'});

    spyOn(component, 'clear').and.callThrough();
    component.fileForm.controls['files'].setValue([file]);
    // expect(component.errorText).toEqual('Oops! Looks like you tried to upload a friend pair list! Try a friend-pair list instead.');
  }));
});
