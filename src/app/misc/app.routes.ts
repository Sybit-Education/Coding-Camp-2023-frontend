import {Routes} from "@angular/router";
import {AuthPageComponent} from "../auth-page/auth-page.component";
import {CreationPageComponent} from "../creation-page/creation-page.component";
import {AuthGuard} from "./auth.guard";
import { TeamSComponent } from "../team-s/team-s.component";
import { DsgvoPageComponent } from "../dsgvo-page/dsgvo-page.component";
import { ImpressumComponent } from "../impressum/impressum.component";
import { NeedsComponent } from "../needs/needs.component";

export const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthPageComponent},
  {path: 'creation', component: CreationPageComponent, canActivate: [AuthGuard]},
  {path: 'team-site', component: TeamSComponent},
  {path: 'dsgvo', component: DsgvoPageComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'needs', component: NeedsComponent},
  {path: '**', redirectTo: 'auth'}
]
