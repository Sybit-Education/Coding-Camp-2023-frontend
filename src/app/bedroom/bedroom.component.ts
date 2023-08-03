import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bedroom',
  templateUrl: './bedroom.component.html',
  styleUrls: ['./bedroom.component.scss']
})
export class BedroomComponent {
 
  constructor(public router:Router){

  }
  left(){
    this.router.navigate(['/bathroom'])

  }
  right(){
    this.router.navigate(['/kitchen'])
    
  }
}
