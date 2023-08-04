import { Component, OnInit } from '@angular/core';
import { SyGotchi } from '../entities/syGotchi';
import { ActionsService } from '../services/actions.service';
import { selectSygotchi } from '../store/sygotchi.selectors';
import { Store } from '@ngrx/store';
import { setSygotchi } from '../store/sygotchi.actions';

@Component({
  selector: 'app-kitchen-function',
  templateUrl: './kitchen-function.component.html',
  styleUrls: ['./kitchen-function.component.scss']
})
export class KitchenFunctionComponent implements OnInit{
  isHungry: number
  isThirsty: number
  feedCooldown: number
  drinkCooldown: number
  message = {text: '', error: false}
  sygotchi: SyGotchi
  showMessage: boolean = false

  constructor(private actionsService: ActionsService, private store: Store) {}

  ngOnInit() {
    this.store.select(selectSygotchi)
      .subscribe(
        syGotchi => {
          if(syGotchi) {
            this.isHungry = syGotchi.hunger
            this.isThirsty = syGotchi.thirst
            this.feedCooldown = syGotchi.feedCooldown
            this.drinkCooldown = syGotchi.drinkCooldown
            this.sygotchi = syGotchi
          }
        }
      )
  }
  feed(){

    if(this.isHungry <= 90){
      if(this.feedCooldown > -1){
        this.message.error = true
        this.message.text = 'Du musst ' + this.feedCooldown + ' Minuten warten bis dein SyGotchi wieder essen kann'
        console.log(this.message.text)
        this.messageHandler()
      }else{
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

    }else{
      this.message.error = true
      this.message.text = 'Sygotchi hat keinen Hunger!'
      this.messageHandler()
    }
  }
  drink(){
    if(this.isThirsty <= 90){
      if(this.drinkCooldown > -1){
        this.message.error = true
        this.message.text = 'Du musst ' + this.drinkCooldown + ' Minuten warten bis dein SyGotchi wieder trinken kann'
        console.log(this.message.text)
        this.messageHandler()
      }else{
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

    }else{
      this.message.error = true
          this.message.text = 'Sygotchi hat keinen Durst!'
          this.messageHandler()
    }
  }
  messageHandler() {
    if(!this.showMessage){
      this.showMessage = true
      console.log(this.showMessage)
      setTimeout(() => {
        this.showMessage = false
      }, 7000)
    }
  }
}
