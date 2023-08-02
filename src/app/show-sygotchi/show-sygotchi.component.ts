import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../services/actions.service';
import { SyGotchi } from '../entities/syGotchi';
import * as paper from 'paper';
import { Eye } from '../enums/eye.enum';
import { Project } from "paper";
import { WebsocketService } from '../services/websocket.service';
import { selectSygotchi } from '../store/sygotchi.selectors';
import { setSygotchi } from '../store/sygotchi.actions';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-show-sygotchi',
  templateUrl: './show-sygotchi.component.html',
  styleUrls: ['./show-sygotchi.component.scss']
})
export class ShowSygotchiComponent implements OnInit {
  sygotchi: SyGotchi
  canvas: any
  shapePath: any
  shape: any

  constructor(private actionsService: ActionsService, private store: Store, private wsService: WebsocketService) { }

  ngOnInit(): void {
    window['paper'] = paper;
    new Project('canvas');

    this.canvas = paper.project.activeLayer;

    this.canvas = paper.project.activeLayer;
    this.store.select(selectSygotchi).subscribe(result => {
      this.sygotchi = result

      if(this.sygotchi === null) {
        this.actionsService.getSygotchi().subscribe(result => {
          this.sygotchi = result
          this.store.dispatch(setSygotchi({sygotchi: result as SyGotchi}))
          this.buildSygotchi()
        })
      } else {
        this.wsService.initializeWebSocketConnection(this.sygotchi.id)
        this.buildSygotchi()
      }
    })
  }


  buildSygotchi() {
    const shapeType = this.sygotchi.shape;
    const color = this.sygotchi.color;
    const width = this.sygotchi.width;
    const height = this.sygotchi.height;
    const eyes = this.sygotchi.eyes;
    let eyeSize;
    let pupilSize;

    switch(eyes){

      case Eye.SMALL:
        eyeSize = Math.min(width, height) * 0.1;
        pupilSize = eyeSize * 0.5;
      break;

      case Eye.MEDIUM:
        eyeSize = Math.min(width, height) * 0.2;
        pupilSize = eyeSize * 0.5;
      break;

      case Eye.LARGE:
        eyeSize = Math.min(width, height) * 0.3;
        pupilSize = eyeSize * 0.5;
      break;
    }
    switch(shapeType){
      case 'TRIANGLE':
        this.shape = new paper.Path.RegularPolygon({
          center: paper.view.center,
          sides: 3,
          radius: width / 2,
          fillColor: color
        });
        break;

      case 'RECTANGLE':
        this.shape = new paper.Path.Rectangle({
          point: paper.view.center.subtract(new paper.Point(width / 2, height / 2)),
          size: [width, height],
          fillColor: color
        });
        break;
      case 'CIRCLE':
        this.shape = new paper.Path.Circle({
          center: paper.view.center,
          radius: width / 2,
          fillColor: color
        });
        break;
    }
    const eyeLeft = new paper.Path.Circle({
      center: this.shape.position.subtract(new paper .Point(width / 4, height / 10)),
      radius: eyeSize,
      fillColor: 'white'
    })
    const eyeRight = new paper.Path.Circle({
      center: this.shape.position.subtract(new paper .Point(-width / 4, height / 10)),
      radius: eyeSize,
      fillColor: 'white'
    })
    const pupilLeft = new paper.Path.Circle({
      center: eyeLeft.position.add(new paper.Point(0, eyeSize * 0.1)),
      radius: pupilSize,
      fillColor: 'black'
    })
    const pupilRight = new paper.Path.Circle({
      center: eyeRight.position.add(new paper.Point(0, eyeSize * 0.1)),
      radius: pupilSize,
      fillColor: 'black'
    })
    this.shapePath = new paper.Group({
      children: [this.shape, eyeLeft, eyeRight, pupilRight, pupilLeft]
    })
    this.canvas.addChild(this.shapePath);
  }
}
