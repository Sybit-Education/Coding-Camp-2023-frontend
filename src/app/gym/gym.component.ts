import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.scss']
})
export class GymComponent {
  constructor(public router:Router){

  }
  left(){
    this.router.navigate(['/bedroom'])

  }
  right(){
    this.router.navigate(['/kitchen'])
  }
}
