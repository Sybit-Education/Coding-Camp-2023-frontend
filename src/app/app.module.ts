import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor} from "./misc/auth.interceptor";
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RouterModule, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { APP_ROUTES } from "./misc/app.routes";
import { StoreModule } from "@ngrx/store";
import { sygotchiReducer } from "./store/sygotchi.reducer";
import { LogoComponent } from './logo/logo.component';
import { TeamSComponent } from './team-s/team-s.component';
import { DsgvoPageComponent } from './dsgvo-page/dsgvo-page.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { NeedsComponent } from './needs/needs.component';
import { ShowSygotchiComponent } from './show-sygotchi/show-sygotchi.component';
import { SygotchiErstellenComponent } from './sygotchi-erstellen/sygotchi-erstellen.component';
import { HeaderComponent } from './header/header.component';
import { SygotchiCleanComponent } from './sygotchi-clean/sygotchi-clean.component';
import { SleepSceneComponent } from './sleep-scene/sleep-scene.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { FooterComponent } from './footer/footer.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CleanFunctionComponent } from './clean-function/clean-function.component';
import { KitchenFunctionComponent } from './kitchen-function/kitchen-function.component';
import { BedroomComponent } from './bedroom/bedroom.component';
import { GymComponent } from './gym/gym.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    LogoComponent,
    TeamSComponent,
    DsgvoPageComponent,
    ImpressumComponent,
    ShowSygotchiComponent,
    SygotchiErstellenComponent,
    HeaderComponent,
    SleepSceneComponent,
    ImpressumComponent,
    NeedsComponent,
    KitchenComponent,
    NeedsComponent,
    SygotchiCleanComponent,
    FooterComponent,
    ErrorPageComponent,
    CleanFunctionComponent,
    KitchenFunctionComponent,
    BedroomComponent,
    HowToPlayComponent,
    ErrorPageComponent,
    GymComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    NgbModule,
    StoreModule.forRoot({ sygotchi: sygotchiReducer }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
