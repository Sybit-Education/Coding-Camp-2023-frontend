import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {setSygotchi} from "../store/sygotchi.actions";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient;
  subscription: Subscription
  apiUrl = environment.apiUrl

  constructor(private store: Store) { }

  initializeWebSocketConnection(syGotchiId: string) {
    if(!this.subscription) {
      const serverUrl = `${this.apiUrl}/websocket`
      const ws = new SockJS(serverUrl)
      this.stompClient = Stomp.over(ws)
      this.stompClient.debug = null
      this.stompClient.connect({}, (frame) => {
        setTimeout(() => {
          this.subscription = this.stompClient.subscribe('/topic/update/' + syGotchiId, sygotchi => {
            this.store.dispatch(setSygotchi({sygotchi: JSON.parse(sygotchi.body)}))
          })
        }, 1000)
      })
    }
  }
}

  
