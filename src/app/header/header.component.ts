import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public route: Router, public authService: AuthService){}

  checkLogin(){
    if(localStorage.token){
      this.route.navigate(['/sleep'])
    }else{
      this.route.navigate(['/auth'])
    }
  }
}
