import {Routes} from "@angular/router";
import {AuthPageComponent} from "../auth-page/auth-page.component";
import {AuthGuard} from "./auth.guard";
import { SygotchiErstellenComponent } from "../sygotchi-erstellen/sygotchi-erstellen.component";
import { TeamSComponent } from "../team-s/team-s.component";
import { DsgvoPageComponent } from "../dsgvo-page/dsgvo-page.component";
import { ImpressumComponent } from "../impressum/impressum.component";
import { SygotchiCleanComponent } from "../sygotchi-clean/sygotchi-clean.component";
import {SleepSceneComponent} from "../sleep-scene/sleep-scene.component";
import { HowToPlayComponent } from "../how-to-play/how-to-play.component";
export const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthPageComponent},
  {path: 'create', component: SygotchiErstellenComponent, canActivate: [AuthGuard]},
  {path: 'team-site', component: TeamSComponent},
  {path: 'dsgvo', component: DsgvoPageComponent},
  {path: 'clean', component: SygotchiCleanComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'clean', component: SygotchiCleanComponent, canActivate: [AuthGuard]},
  {path: 'sleep', component: SleepSceneComponent, canActivate: [AuthGuard]},
  {path: 'how-to-play', component: HowToPlayComponent},
  {path: '**', redirectTo: 'auth' }
]
