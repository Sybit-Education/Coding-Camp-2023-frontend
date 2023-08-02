import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store, resultMemoize } from '@ngrx/store';
import { WebsocketService } from '../services/websocket.service';
import { HttpStatusCode } from '@angular/common/http';
import { setSygotchi } from '../store/sygotchi.actions';
import { SyGotchi } from '../entities/syGotchi';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  isRegistration: boolean = false
  authForm: FormGroup;
  showError: boolean = false
  errorMessage: string = ''

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private store: Store, private wsService: WebsocketService, private actionsService) {}

  ngOnInit() {
    localStorage.clear()
    this.authForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register() {
    if(this.authForm.value.password === this.authForm.get('confirmPassword')?.value) {
      this.authService.register(this.authForm.value.username, this.authForm.value.password)
      .subscribe(
        result => {
          localStorage.setItem('token', result["token"])
          localStorage.setItem('id', result["id"])
          this.router.navigate(['/creation']);
        },
      err => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.errorMessage = 'Benutzername wird bereits verwendet.'
          this.showError = true;
        } else {
          this.errorMessage = 'Unerwarteter Fehler'
          this.showError = true;
        }
      } 
      );
    } else {
    this.errorMessage = 'Passwörter stimmen nicht überein.'
    this.showError = true;
    }
  }

  login() {
    this.authService.login(this.authForm.value.username, this.authForm.value.password)
    .subscribe(
      result => {
        localStorage.setItem('token', result["token"])
        localStorage.setItem('id', result["id"]),
      
        this.actionsService.getSyGotchi().subscribe(result =>{
          this.store.dispatch(setSygotchi({sygotchi:result as SyGotchi}))
          this.wsService.initializeWebSocketConnection(result.id)
        });
        () => {
          this.router.navigate(['/creation'])
        }
      },
      err => {
        if (err.status === HttpStatusCode.BadRequest) {
          this.errorMessage = 'Benutzername / Passwort ist falsch.'
          this.showError = true
        } else {
          this.errorMessage = 'Unerwarteter Fehler'
          this.showError = true
        }
      }
    )
  }

  changeView() {
    this.isRegistration = !this.isRegistration
    if(this.isRegistration) {
      this.authForm.addControl('confirmPassword', new FormControl("", Validators.required))
    } else {
      this.authForm.removeControl('confirmPassword')
    }
    this.showError = false
    this.authForm.reset()
  }



}