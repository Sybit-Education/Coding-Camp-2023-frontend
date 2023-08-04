import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSygotchi } from '../store/sygotchi.selectors';

@Component({
  selector: 'app-bedroom',
  templateUrl: './bedroom.component.html',
  styleUrls: ['./bedroom.component.scss']
})
export class BedroomComponent implements OnInit{
  isAsleep: boolean;
  constructor(public router:Router, public store:Store){}
  ngOnInit(): void {
    this.store.select(selectSygotchi)
        .subscribe(
          syGotchi => {
            this.isAsleep = syGotchi.sleeping
          }
        )
  }
  left(){
    if(this.isAsleep == false){
      this.router.navigate(['/bathroom'])
    }
  }
  right(){
    if(this.isAsleep == false){
      this.router.navigate(['/gym'])
    }
  }
}