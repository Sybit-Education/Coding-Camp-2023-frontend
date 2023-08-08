import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sygotchi-clean',
  templateUrl: './sygotchi-clean.component.html',
  styleUrls: ['./sygotchi-clean.component.scss']
})
export class SygotchiCleanComponent {
  constructor(public router:Router){

  }
  left(){
    this.router.navigate(['/kitchen'])

  }
  right(){
    this.router.navigate(['/bedroom'])
    
  }
}
