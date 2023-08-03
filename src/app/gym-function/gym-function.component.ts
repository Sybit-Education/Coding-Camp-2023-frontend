import { Component } from '@angular/core';
import { SyGotchi } from '../entities/syGotchi';
import { ActionsService } from '../services/actions.service';
import { Store } from '@ngrx/store';
import { selectSygotchi } from '../store/sygotchi.selectors';
import { setSygotchi } from '../store/sygotchi.actions';

@Component({
  selector: 'app-gym-function',
  templateUrl: './gym-function.component.html',
  styleUrls: ['./gym-function.component.scss']
})
export class GymFunctionComponent {
  isTired: number = 0
  isBored: number
  message = {text: '', error: false}
  sygotchi: SyGotchi
  showMessage: boolean = false

  constructor(private actionsService: ActionsService, private store: Store) {}

  ngOnInit() {
    this.store.select(selectSygotchi)
      .subscribe(
        syGotchi => {
          this.isTired = syGotchi.tired
          this.isBored = syGotchi.bored
          this.sygotchi = syGotchi
        }
      )
  }
  play(){
    console.log(this.sygotchi)
    if(this.isTired <= 50 ){
      this.actionsService.playWithSygotchi()
      .subscribe
      (res => {
        this.message.text = 'Sygotchi hat erfolgreich trainiert!'
        this.messageHandler()
        this.store.dispatch(setSygotchi({sygotchi: res as SyGotchi}))
      },
      () => {
        this.message.error = true
        this.message.text = 'Sygotchi hat genug trainiert!'
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

