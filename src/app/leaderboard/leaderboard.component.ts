import {Component, OnInit} from '@angular/core';
import {ActionsService} from "../services/actions.service";
import {SyGotchi} from "../entities/syGotchi";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  sygotchis: SyGotchi[]

  constructor(private dataService: ActionsService) {}

  ngOnInit() {
    this.dataService.getRanking().subscribe(ranking => {
      this.sygotchis = ranking as unknown as SyGotchi[]
    })
  }

  getTableRowBackground(rank: number): string {
    switch (rank) {
      case 1:
        return 'bg-gold';
      case 2:
        return 'bg-silver';
      case 3:
        return 'bg-bronze';
      default:
        return '';
    }
  }
}
