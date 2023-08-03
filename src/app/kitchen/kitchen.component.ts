import { Component, OnInit } from '@angular/core';
import { SyGotchi } from '../entities/syGotchi';
import { ActionsService } from '../services/actions.service';
import { selectSygotchi } from '../store/sygotchi.selectors';
import { Store } from '@ngrx/store';
import { setSygotchi } from '../store/sygotchi.actions';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit{
  isHungry: number
  isThirsty: number
  message = {text: '', error: false}
  sygotchi: SyGotchi
  showMessage: boolean = false

  constructor(private actionsService: ActionsService, private store: Store) {}

  ngOnInit() {
    this.store.select(selectSygotchi)
      .subscribe(
        syGotchi => {
          this.isHungry = syGotchi.hunger
          this.isThirsty = syGotchi.thirst
          this.sygotchi = syGotchi
        }
      )
  }
  feed(){
    if(this.isHungry <= 90){
      this.actionsService.feedSygotchi()
      .subscribe
      (res => {
        this.message.text = 'Sygotchi ist jetzt satt!'
        this.messageHandler()
        this.store.dispatch(setSygotchi({sygotchi: res as SyGotchi}))
      },
      () => {
        this.message.error = true
        this.message.text = 'Sygotchi hat keinen Hunger mehr!'
        this.messageHandler()
      })
    }
  }
  drink(){
    if(this.isThirsty <= 90){
      this.actionsService.drinkSygotchi().subscribe
      (res => {
        this.message.text = 'Sygotchi ist jetzt sitt!'
        this.messageHandler()
        this.store.dispatch(setSygotchi({sygotchi: res as SyGotchi}))
      },
      () => {
        this.message.error = true
        this.message.text = 'Sygotchi hat keinen Durst mehr!'
        this.messageHandler()
      })
    }
  }
  messageHandler() {
    this.showMessage = true
    setTimeout(() => {
      this.showMessage = false
    }, 7000)
  }
}
