import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from '../chat-service/chatservice.service';

@Component({
  selector: 'app-chatform',
  templateUrl: './chatform.component.html',
  styleUrls: ['./chatform.component.css']
})
export class ChatformComponent implements OnInit {

  text: string;

  constructor(private chatService: ChatserviceService) { 

    this.text = "";
  }

  ngOnInit(): void {
  }

  send() {
    this.chatService.send(this.text);
    this.text = "";
  }

  handleSubmit(e: KeyboardEvent) {
    if (e.keyCode === 13) { this.send(); }
  }
}
