import { Component, OnInit } from '@angular/core';
import { SyGotchi } from '../entities/syGotchi';
import { ActionsService } from '../services/actions.service';
import { Store } from '@ngrx/store';
import { selectSygotchi } from '../store/sygotchi.selectors';
import { setSygotchi } from '../store/sygotchi.actions';

@Component({
  selector: 'app-clean-function',
  templateUrl: './clean-function.component.html',
  styleUrls: ['./clean-function.component.scss']
})
export class CleanFunctionComponent implements OnInit {
  isDirty: number
  message = {text:'', Error:false}
  sygotchi:SyGotchi
  showMessage: boolean = false

  constructor(private actionsService: ActionsService, private store: Store){}

  ngOnInit(): void {
      this.store.select(selectSygotchi).subscribe(SyGotchi => {
        if(SyGotchi) {
          this.isDirty = SyGotchi.dirty
          this.sygotchi = SyGotchi
        }
      })
  }
  clean(){
    if(this.isDirty <= 50){
      this.actionsService.clean().subscribe(res => {
        this.message.text = 'Sygotchi ist nun sauber!'
        this.messageHandler()
        this.store.dispatch(setSygotchi({sygotchi: res as SyGotchi}))
      },
      () => {
        this.message.Error = true
        this.message.text = "Sygotchi ist nicht dreckig genug!"
        this.messageHandler()
      }

      )
    }else{
      this.message.Error = true
        this.message.text = "Sygotchi ist nicht dreckig genug!"
        this.messageHandler()
    }
  }
  messageHandler() {
    if(!this.showMessage){
      this.showMessage = true
      setTimeout(() => {
        this.showMessage = false
      }, 7000)
    }
  }
}
