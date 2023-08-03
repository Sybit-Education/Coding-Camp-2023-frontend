import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActionsService} from "../services/actions.service";
import {SyGotchi} from "../entities/syGotchi";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {

  sygotchis: SyGotchi[]

  constructor(private modalService: NgbModal, private dataService: ActionsService) {}

  open(content) {
    this.dataService.getRanking().subscribe(ranking => {
      this.sygotchis = ranking as unknown as SyGotchi[]

      this.modalService.open(content)
    })
  }
}