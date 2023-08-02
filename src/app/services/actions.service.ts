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

  constructor(private http: HttpClient) {}

  createSygotchi(name, eyes, shape, color, height, width): Observable<SyGotchi> {
    return this.http.post<SyGotchi>(`${this.apiUrl}/tamagotchi`, { name, eyes, shape, color, height, width })
  }

  getSygotchi(): Observable<SyGotchi> {
    return this.http.get<SyGotchi>(`${this.apiUrl}/tamagotchi`)
  }

   sleep(): Observable<SyGotchi> {
    return this.http.post<SyGotchi>(`${this.apiUrl}/tamagotchi/sleep`, null)
  }

  wakeUp(): Observable<SyGotchi> {
    return this.http.post<SyGotchi>(`${this.apiUrl}/tamagotchi/wakeUp`, null)
  }
  clean(): Observable<SyGotchi> {
    return this.http.put<SyGotchi>(`${this.apiUrl}/tamagotchi/clean`, null)
  }


}
