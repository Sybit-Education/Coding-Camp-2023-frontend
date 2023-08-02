import { Component } from '@angular/core';
import { ActionService } from "../services/"

@Component({
  selector: 'app-needs',
  templateUrl: './needs.component.html',
  styleUrls: ['./needs.component.scss']
})
export class NeedsComponent {
  constructor(private modalService: NgbModal, private actionService: ActionService, private store: Store){}
}

