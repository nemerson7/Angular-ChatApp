import { Component, OnChanges, OnInit } from '@angular/core';

import { ChatserviceService } from '../chat-service/chatservice.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Component({
  selector: 'app-chatmessages',
  templateUrl: './chatmessages.component.html',
  styleUrls: ['./chatmessages.component.css']
})
export class ChatmessagesComponent implements OnInit, OnChanges {

  messageFeedRef: AngularFireList<any>;
  messageFeed: Observable<any[]>;

  constructor(private chatService: ChatserviceService, private af: AngularFireDatabase) { 
    this.messageFeedRef = this.af.list('messages');
    this.messageFeed = this.messageFeedRef.valueChanges();
    this.messageFeed.subscribe(res => console.log(res));
  }

  ngOnInit(): void { 
    this.messageFeed = this.chatService.getMessages().valueChanges()
  }

  ngOnChanges(): void { 
    this.messageFeed = this.chatService.getMessages().valueChanges()

  }

}
