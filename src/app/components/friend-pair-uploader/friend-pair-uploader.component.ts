import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { IFriend } from '../../interfaces/i-friend';
import { IGuest } from '../../interfaces/i-guest';

@Component({
  selector: 'app-friend-pair-uploader',
  templateUrl: './friend-pair-uploader.component.html',
  styleUrls: ['./friend-pair-uploader.component.scss']
})
export class FriendPairUploaderComponent {
  private _errorText: string = '';
  @Output() public validFileUploaded: EventEmitter<IFriend []> = new EventEmitter<IFriend []>();
  public _filesControl = new FormControl(null, [
    FileUploadValidators.filesLimit(1),
    FileUploadValidators.accept(['.json']),
  ]);

  public fileForm = new FormGroup({
    files: this._filesControl,
  });

  public set errorText(text: string) {
    this._errorText = text;
  }

  public get errorText(): string {
    return this._errorText;
  }

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
      this.parseFile(file).then(res => console.log(res));
    }
  }

  private hasErrors(fileContentsAsText: string): boolean {
    const guestList: {guests: IGuest []} =  JSON.parse(fileContentsAsText);
    const friendList: {friends: IFriend []} =  JSON.parse(fileContentsAsText);

    if (guestList.guests && !friendList.friends) {
      this.errorText = 'Oops! Looks like you tried to upload a guest list! Try a friend-pair list instead.'
      return true;
    } else if (!friendList.friends) {
      this.errorText = 'Oops! Looks like you are missing the root "friends" object! Fix file and try again.'
      return true;
    } else if (!friendList.friends.length) {
      this.errorText = 'Oops! Looks like you tried to upload an empty list!'
      return true;
    } else {
      let hasError = false;
      friendList.friends.forEach(friend => {
        if (friend.ids.length !== 2) {
          hasError = true;
        }
      });

      if (hasError) {
        this.errorText = 'Oops! Looks like you tried to upload an invalid list! Make sure each array has exactly 2 ids';
        return true;
      }
    }

    this.errorText = '';
    return false;
  }

  private parseFile(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (!fileReader.result) {
        return;
      }

      console.log('result');
      const text = fileReader.result.toString() || '';
      if (this.hasErrors(text)) {
        this.clear();
        return;
      }
      const friendsList: {friends: IFriend []} =  JSON.parse(text);
      this.validFileUploaded.emit(friendsList.friends);
    }

    fileReader.onerror = (error) => {
      console.log(error);
    }

    fileReader.readAsText(file, "UTF-8");
  });

  }

}
