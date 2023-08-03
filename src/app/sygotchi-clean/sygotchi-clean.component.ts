import { Component, OnInit } from '@angular/core';
import { SyGotchi } from '../entities/syGotchi';
import { ActionsService } from '../services/actions.service';
import { Store } from '@ngrx/store';
import { selectSygotchi } from '../store/sygotchi.selectors';
import { setSygotchi } from '../store/sygotchi.actions';

@Component({
  selector: 'app-sygotchi-clean',
  templateUrl: './sygotchi-clean.component.html',
  styleUrls: ['./sygotchi-clean.component.scss']
})
export class SygotchiCleanComponent {
  
}
