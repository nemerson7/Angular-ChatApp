import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroll') private container: ElementRef;

  title = 'Chat';

  constructor() { 
  }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked() {
    window.scrollTo(0,document.body.scrollHeight);
  }

}
