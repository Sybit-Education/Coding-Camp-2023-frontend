import {Routes} from "@angular/router";
import {AuthPageComponent} from "../auth-page/auth-page.component";
import {AuthGuard} from "./auth.guard";
import { SygotchiErstellenComponent } from "../sygotchi-erstellen/sygotchi-erstellen.component";
import { TeamSComponent } from "../team-s/team-s.component";
import { DsgvoPageComponent } from "../dsgvo-page/dsgvo-page.component";
import { ImpressumComponent } from "../impressum/impressum.component";

export const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthPageComponent},
  {path: 'create', component: SygotchiErstellenComponent, canActivate: [AuthGuard]},
  {path: 'team-site', component: TeamSComponent},
  {path: 'dsgvo', component: DsgvoPageComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: '**', redirectTo: 'auth'}
]
