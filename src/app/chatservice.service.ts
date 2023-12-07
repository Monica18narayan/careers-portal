import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatBotUrl = 'http://localhost:8081/api/chat';
  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    return this.http.post<any>(this.chatBotUrl, { message });
  }
}