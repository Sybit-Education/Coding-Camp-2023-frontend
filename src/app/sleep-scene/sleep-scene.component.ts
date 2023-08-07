import {Component, OnInit} from '@angular/core';
import {ActionsService} from "../services/actions.service";
import {Store} from "@ngrx/store";
import {SyGotchi} from "../entities/syGotchi";
import {setSygotchi} from "../store/sygotchi.actions";
import {selectSygotchi} from "../store/sygotchi.selectors";

@Component({
  selector: 'app-sleep-scene',
  templateUrl: './sleep-scene.component.html',
  styleUrls: ['./sleep-scene.component.scss']
})
export class SleepSceneComponent implements OnInit {
  isAsleep: boolean = false
  message = {text: '', error: false}
  sygotchi: SyGotchi
  showMessage: boolean = false

  constructor(private actionsService: ActionsService, private store: Store) {}

  ngOnInit() {
    this.store.select(selectSygotchi)
      .subscribe(
        syGotchi => {
          if(syGotchi) {
            this.isAsleep = syGotchi.sleeping
            this.sygotchi = syGotchi
          }
        }
      )
  }

  onSleep() {
    if(!this.isAsleep) {
      this.actionsService.sleep()
        .subscribe(
          result => {
            this.message.text = 'SyGotchi schläft nun.'
            this.messageHandler()

            this.store.dispatch(setSygotchi({sygotchi: result as SyGotchi}))
          },
          () => {
            this.message.error = true
            this.message.text = "SyGotchi ist nicht müde genug."
            this.messageHandler()
          }
        )
    } else {
      this.actionsService.wakeUp()
        .subscribe(
          result => {
            this.message.text = 'SyGotchi ist wieder aufgewacht.'
            this.messageHandler()

            this.store.dispatch(setSygotchi({sygotchi: result as SyGotchi}))
          },
          () => {
            this.message.error = true
            this.message.text = "SyGotchi kann nicht aufwachen."
            this.messageHandler()
          }
        )
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
