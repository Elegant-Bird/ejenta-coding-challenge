import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {HttpClientModule} from '@angular/common/http';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { PeopleUploaderComponent } from './components/people-uploader/people-uploader.component';
import { FriendPairUploaderComponent } from './components/friend-pair-uploader/friend-pair-uploader.component';
import { FriendMetadataComponent } from './components/friend-metadata/friend-metadata.component';
import { InviteGeneratorComponent } from './components/invite-generator/invite-generator.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatListModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PeopleUploaderComponent,
    FriendPairUploaderComponent,
    FriendMetadataComponent,
    InviteGeneratorComponent
  ],
  imports: [
    MATERIAL_MODULES,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule,
    FlexModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
