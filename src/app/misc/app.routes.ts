import {Routes} from "@angular/router";
import {AuthPageComponent} from "../auth-page/auth-page.component";
import {CreationPageComponent} from "../creation-page/creation-page.component";
import {AuthGuard} from "./auth.guard";
import { ImpressumComponent } from "../impressum/impressum.component";

export const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthPageComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'creation', component: CreationPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'auth'}
]
