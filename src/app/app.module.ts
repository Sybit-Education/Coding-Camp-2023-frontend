import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./misc/auth.interceptor";
import { AuthPageComponent } from './auth-page/auth-page.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {APP_ROUTES} from "./misc/app.routes";
import {StoreModule} from "@ngrx/store";
import {sygotchiReducer} from "./store/sygotchi.reducer";
import { LogoComponent } from './logo/logo.component';
import { TeamSComponent } from './team-s/team-s.component';
import { DsgvoPageComponent } from './dsgvo-page/dsgvo-page.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { SygotchiErstellenComponent } from './sygotchi-erstellen/sygotchi-erstellen.component';
import { HeaderComponent } from './header/header.component';
import { SygotchiCleanComponent } from './sygotchi-clean/sygotchi-clean.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    LogoComponent,
    TeamSComponent,
    DsgvoPageComponent,
    ImpressumComponent,
    SygotchiErstellenComponent,
    ImpressumComponent,
    HeaderComponent,
    SygotchiCleanComponent
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
