import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SyGotchi } from "../entities/syGotchi";
import { setSygotchi } from "../store/sygotchi.actions";

@Injectable({
    providedIn:'root'
})
export class ActionsService{
    apiUrl=environment.apiUrl

    constructor(private http: HttpClient) {}

    getAccountInfo {
        const id= localStorage.getItem('id')
        return this.http.get('${this.apiUrl}/user/${id}')
    }

    getSygotchi(): Observable<SyGotchi> {
        return.this.http.get<Sygotchi>('$({this.apiUrl}/tamagotchi')
    }
}
