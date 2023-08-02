import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SyGotchi} from "../entities/syGotchi";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  getAccountInfo() {
    const id = localStorage.getItem('id')

    return this.http.get(`${this.apiUrl}/user/${id}`)
  }

  getSygotchi(): Observable<SyGotchi> {
    return this.http.get<SyGotchi>(`${this.apiUrl}/tamagotchi`)
  }
}
