import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./misc/auth.interceptor";
import { AuthPageComponent } from './auth-page/auth-page.component';
import { CreationPageComponent } from './creation-page/creation-page.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {APP_ROUTES} from "./misc/app.routes";
import {StoreModule} from "@ngrx/store";
import {sygotchiReducer} from "./store/sygotchi.reducer";
import { TeamSComponent } from './team-s/team-s.component';
import { DsgvoPageComponent } from './dsgvo-page/dsgvo-page.component';
import { ImpressumComponent } from './impressum/impressum.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    CreationPageComponent,
    TeamSComponent,
    DsgvoPageComponent,
    ImpressumComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    NgbModule,
    StoreModule.forRoot({ sygotchi: sygotchiReducer })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
