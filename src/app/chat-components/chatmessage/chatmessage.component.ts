import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/messageModel';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {

  @Input() message: Message;
  username: string;
  email: string;
  text: string;
  time: Date = new Date();

  constructor(private authService: AuthService) { 
    authService.user$.subscribe(user => {
      //add stuff later to differentiate between current user and other users
    });
  }

  ngOnInit(message = this.message): void {
    this.text = message.message!;
    this.username = message.username!;
    this.email = message.email!;
    this.time = message.timeSent!;
  }

}
