import { Component } from '@angular/core';
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
export class KitchenComponent {
  isAsleep: boolean = false
  message = {text: '', error: false}
  sygotchi: SyGotchi
  showMessage: boolean = false

  constructor(private actionsService: ActionsService, private store: Store) {}

  ngOnInit() {
    this.store.select(selectSygotchi)
      .subscribe(
        syGotchi => {
          this.isAsleep = syGotchi.sleeping
          this.sygotchi = syGotchi
        }
      )
  }
  feed(){
  
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
  drink(){
    this.actionsService.drinkSygotchi()
  }
  messageHandler() {
    this.showMessage = true
    setTimeout(() => {
      this.showMessage = false
    }, 7000)
  }
}
