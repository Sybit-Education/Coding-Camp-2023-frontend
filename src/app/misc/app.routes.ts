import { Routes } from "@angular/router";
import { AuthPageComponent } from "../auth-page/auth-page.component";
import { AuthGuard } from "./auth.guard";
import { SygotchiErstellenComponent } from "../sygotchi-erstellen/sygotchi-erstellen.component";
import { TeamSComponent } from "../team-s/team-s.component";
import { DsgvoPageComponent } from "../dsgvo-page/dsgvo-page.component";
import { ImpressumComponent } from "../impressum/impressum.component";
import { SygotchiCleanComponent } from "../clean-scene/sygotchi-clean.component";
import { HowToPlayComponent } from "../how-to-play/how-to-play.component";
import { KitchenComponent } from "../kitchen/kitchen.component";
import { ErrorPageComponent } from "../error-page/error-page.component";
import { BedroomSceneComponent } from "../bedroom-scene/bedroom-scene.component";
import {LeaderboardComponent} from "../leaderboard/leaderboard.component";
import { GymComponent } from "../gym/gym.component";

export const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthPageComponent},
  {path: 'create', component: SygotchiErstellenComponent, canActivate: [AuthGuard]},
  {path: 'team-site', component: TeamSComponent},
  {path: 'dsgvo', component: DsgvoPageComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'bathroom', component: SygotchiCleanComponent, canActivate: [AuthGuard]},
  {path: 'kitchen', component: KitchenComponent, canActivate: [AuthGuard]},
  {path: 'bedroom', component: BedroomSceneComponent, canActivate: [AuthGuard]},
  {path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard]},
  {path: 'gym', component: GymComponent, canActivate: [AuthGuard]},
  {path: 'how-to-play', component: HowToPlayComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: 'error' }

]
