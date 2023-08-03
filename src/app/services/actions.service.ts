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

  getAccountInfo() {
    const id = localStorage.getItem('id')

    return this.http.get(`${this.apiUrl}/user/${id}`)
  }

  getSygotchi(): Observable<SyGotchi> {
    return this.http.get<SyGotchi>(`${this.apiUrl}/tamagotchi`)
  }

  createSygotchi(name, eyes, shape, color, height, width): Observable<SyGotchi> {
    return this.http.post<SyGotchi>(`${this.apiUrl}/tamagotchi`, { name, eyes, shape, color, height, width })
  }

  cleanSygotchi(): Observable<SyGotchi> {
    return this.http.put<SyGotchi>(`${this.apiUrl}/tamagotchi/clean`, null)
  }

  playWithSygotchi(): Observable<SyGotchi> {
    return this.http.post<SyGotchi>(`${this.apiUrl}/tamagotchi/play`, null)
  }

  feedSygotchi(): Observable<SyGotchi> {
    return this.http.put<SyGotchi>(`${this.apiUrl}/tamagotchi/feed`, null)
  }

  drinkSygotchi(): Observable<SyGotchi> {
    return this.http.put<SyGotchi>(`${this.apiUrl}/tamagotchi/drink`, null)
  }

  sleepSygotchi(): Observable<SyGotchi> {
    return this.http.post<SyGotchi>(`${this.apiUrl}/tamagotchi/sleep`, null)
  }

  wakeUpSygotchi(): Observable<SyGotchi> {
    return this.http.post<SyGotchi>(`${this.apiUrl}/tamagotchi/wakeUp`, null)
  }

  killSygotchi(id): Observable<SyGotchi> {
    return this.http.post<SyGotchi>(`${this.apiUrl}/tamagotchi/kill`, {id})
  }

  getRanking(): Observable<SyGotchi> {
    return this.http.get<SyGotchi>(`${this.apiUrl}/tamagotchi/highscore`)
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
