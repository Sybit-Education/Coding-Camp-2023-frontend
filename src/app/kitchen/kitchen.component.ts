import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent{
    
  constructor(public router:Router){

  }
  left(){
    this.router.navigate(['/bedroom'])

  }
  right(){
    this.router.navigate(['/bathroom'])

  }
}
