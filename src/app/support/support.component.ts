import { Component } from '@angular/core';
import { ChatService } from '../chatservice.service';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  userMessage = '';
  messages: { text: string; sender: string }[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    this.messages.push({ text: this.userMessage, sender: 'user' });
    this.chatService.sendMessage(this.userMessage).subscribe((response: any) => {
      this.messages.push({ text: response.message, sender: 'bot' });
    }, (error) => {
      console.error('Error fetching response from server:', error);
    });
    this.userMessage = '';
  }
}
