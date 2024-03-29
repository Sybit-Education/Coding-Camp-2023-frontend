import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActionsService} from "../services/actions.service";
import {Mood} from "../enums/mood.enum";
import {Store} from "@ngrx/store";
import {SyGotchi} from "../entities/syGotchi";
import {selectSygotchi} from "../store/sygotchi.selectors";

@Component({
  selector: 'app-needs',
  templateUrl: './needs.component.html',
  styleUrls: ['./needs.component.scss']
})
export class NeedsComponent {
  sygotchi: SyGotchi
  mood: string

  needsLeft = [
    { label: 'Hunger', icon: 'fa-solid fa-drumstick-bite fa-lg', progress: 0 },
    { label: 'Durst', icon: 'fa-solid fa-glass-water fa-lg', progress: 0 },
    { label: 'Hygiene', icon: 'fa-solid fa-bath fa-lg', progress: 0 },
    { label: 'Müde', icon: 'fa-solid fa-battery-full fa-lg', progress: 0 },
    { label: 'Gelangweilt', icon: 'fa-solid fa-user-group fa-lg', progress: 0 },
  ]

  constructor(private modalService: NgbModal, private actionsService: ActionsService, private store: Store) {
    this.store.select(selectSygotchi).subscribe(result => {
      this.sygotchi = result as SyGotchi

      if (this.sygotchi) {
        this.needsLeft[0].progress = parseInt(this.sygotchi.hunger.toString())
        this.needsLeft[1].progress = parseInt(this.sygotchi.thirst.toString())
        this.needsLeft[2].progress = parseInt(this.sygotchi.dirty.toString())
        this.needsLeft[3].progress = parseInt(this.sygotchi.tired.toString())
        this.needsLeft[4].progress = parseInt(this.sygotchi.bored.toString())
        this.moodIconSelector(this.sygotchi.mood)
      }
    })
  }

  private moodIconSelector(mood: string) {
    switch (mood) {
      case Mood.HAPPY:
        this.mood = 'fa-face-smile'
        break;
      case Mood.SAD:
        this.mood = 'fa-face-sad-tear'
        break;
      case Mood.ANGRY:
        this.mood = 'fa-face-angry'
        break;
      case Mood.HUNGRY:
        this.mood = 'fa-face-grimace'
        break;
      case Mood.THIRSTY:
        this.mood = 'fa-face-flushed'
        break;
      case Mood.TIRED:
        this.mood = 'fa-face-tired'
        break;
      case Mood.DIRTY:
        this.mood = 'fa-face-meh'
        break;
      case Mood.BORED:
        this.mood = 'fa-face-rolling-eyes'
        break;
      default: this.mood = 'fa-face-smile'
    }
  }
}

