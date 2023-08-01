import {Routes} from "@angular/router";
import {AuthPageComponent} from "../auth-page/auth-page.component";
import {CreationPageComponent} from "../creation-page/creation-page.component";
import {AuthGuard} from "./auth.guard";
import { SygotchiErstellenComponent } from "../sygotchi-erstellen/sygotchi-erstellen.component";

export const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthPageComponent},
  {path: 'create', component: SygotchiErstellenComponent},
  {path: 'creation', component: CreationPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'auth'}
]
