import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';





@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  messages: AngularFireList<any>;
  //message: Message;
  user: any;
  username: any;

  constructor(private database: AngularFireDatabase, private auth: AngularFireAuth) { 

    this.auth.authState.subscribe(auth => {
      if (auth !== null && auth !== undefined) { 
        this.user = auth; 
        //NOTE: in the future change this to displayname when we have them implemented
        this.username = auth.email;
      }

      
    })

  }

  getTime() {
    const d = new Date();
    return (d.getUTCMonth()+1) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear() 
            + " " + d.getUTCHours() + ":" + d.getUTCMinutes();
  }

  getMessages(): AngularFireList<any> {

    return this.database.list('messages', r => {
      return r.limitToLast(25).orderByKey()
    })
  }

  send(text: string) {
    const time = this.getTime();
    const email = "";
    this.messages = this.getMessages();
    this.messages.push({
      message: text,
      time: time,
      username: this.username,
      email: this.user.email
    })
  }

  
}
