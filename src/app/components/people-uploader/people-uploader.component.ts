import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { IGuest } from '../../interfaces/i-guest';
import { IFriend } from '../../interfaces/i-friend';

@Component({
  selector: 'app-people-uploader',
  templateUrl: './people-uploader.component.html',
  styleUrls: ['./people-uploader.component.scss']
})
export class PeopleUploaderComponent {
  public errorText: string = '';
  @Output() public validFileUploaded: EventEmitter<IGuest []> = new EventEmitter<IGuest []>();

  public _filesControl = new FormControl(null, [
    FileUploadValidators.filesLimit(1),
    FileUploadValidators.accept(['.json']),
  ]);

  public fileForm = new FormGroup({
    files: this._filesControl,
  });

  constructor() {
    this._filesControl.valueChanges.subscribe(file => {
      if (file.length) {
        this.validateFile(file[0]);
      }
    })
   }

  public clear(): void {
    this._filesControl.setValue([]);
  }

  private validateFile(file: File): void {
    if (file.type !== 'application/json') {
      this.errorText = 'File type must be .json!';
      this.clear();
      return;
    } else {
      this.errorText = '';
      this.parseFile(file);
    }
  }

  private hasErrors(text: string): boolean {
    const guestList: {guests: IGuest []} =  JSON.parse(text);
    const friendList: {friends: IFriend []} =  JSON.parse(text);

    if (!guestList.guests && friendList.friends) {
      this.errorText = 'Oops! Looks like you tried to upload a friend pair list! Try a guest list instead.'
      return true;
    } else if (!guestList.guests) {
      this.errorText = 'Oops! Looks like you are missing the root "guests" object! Fix file and try again.'
      return true;
    } else if (!guestList.guests.length) {
      this.errorText = 'Oops! Looks like you tried to upload an empty list!'
      return true;
    } else if (!guestList.guests[0].id) {
      this.errorText = 'Oops! Looks like you tried to upload an invalid list! Make sure each object has an id, firstName, and lastName';
      return true;
    }

    this.errorText = '';
    return false;
  }

  private parseFile(file: File): void {
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {
      const text = fileReader.result?.toString() || '';
      if (this.hasErrors(text)) {
        this.clear();
        return;
      }
      const guestList: {guests: IGuest []} =  JSON.parse(text);
      this.validFileUploaded.emit(guestList.guests);
    }

    fileReader.onerror = (error) => {
      this.errorText = 'An error occurred on upload. Check your file and try again.'
      console.log(error);
    }
  }


}
