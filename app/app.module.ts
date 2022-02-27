import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatformComponent } from './chat-components/chatform/chatform.component';
import { ChatComponent } from './chat-components/chat/chat.component';
import { ChatmessagesComponent } from './chat-components/chatmessages/chatmessages.component';
import { ChatmessageComponent } from './chat-components/chatmessage/chatmessage.component';
import { UsersComponent } from './chat-components/users/users.component';
import { UserComponent } from './chat-components/user/user.component';

import { ChatserviceService } from './chat-components/chat-service/chatservice.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatformComponent,
    ChatComponent,
    ChatmessagesComponent,
    ChatmessageComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
  ],
  providers: [ChatserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
