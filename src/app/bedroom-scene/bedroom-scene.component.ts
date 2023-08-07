import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSygotchi } from '../store/sygotchi.selectors';

@Component({
  selector: 'app-bedroom-scene',
  templateUrl: './bedroom-scene.component.html',
  styleUrls: ['./bedroom-scene.component.scss']
})
export class BedroomSceneComponent implements OnInit{
  isAsleep: boolean;
  constructor(public router:Router, public store:Store){}
  ngOnInit(): void {
    this.store.select(selectSygotchi)
        .subscribe(
          syGotchi => {
            if(syGotchi) {
              this.isAsleep = syGotchi.sleeping
            }
          }
        )
  }
  left(){
    if(!this.isAsleep){
      this.router.navigate(['/bathroom'])
    }
  }
  right(){
    if(!this.isAsleep){
      this.router.navigate(['/gym'])
    }
  }
}
