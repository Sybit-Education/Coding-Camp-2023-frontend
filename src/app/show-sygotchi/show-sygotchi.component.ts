import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActionsService } from '../services/actions.service';
import { SyGotchi } from '../entities/syGotchi';
import * as paper from 'paper';
import { Eye } from '../enums/eye.enum';
import { Project } from "paper";
import { WebsocketService } from '../services/websocket.service';
import { selectSygotchi } from '../store/sygotchi.selectors';
import { setSygotchi } from '../store/sygotchi.actions';
import {Store} from "@ngrx/store";
import { interval } from 'rxjs';
import { Point } from 'paper/dist/paper-core';

@Component({
  selector: 'app-show-sygotchi',
  templateUrl: './show-sygotchi.component.html',
  styleUrls: ['./show-sygotchi.component.scss']
})
export class ShowSygotchiComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  paperScope: paper.PaperScope;
  sygotchi: SyGotchi
  shapePath: any
  shape: any

  pupilLeft: any
  pupilRight: any
  eyeLeft: any
  eyeRight: any

  animationFrame = 0

  blinkScales = [ 1, 1, 1, 0.9, 0.5, 0.5, 1.5, 1.5, 1.5, 1.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  constructor(private actionsService: ActionsService, private store: Store, private wsService: WebsocketService) { }

  ngAfterViewInit() {
    this.paperScope = new paper.PaperScope();
    this.paperScope.setup(this.canvas.nativeElement);

    new Project('canvas');

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

    this.paperScope.view.onFrame = (event: any) => {
      this.onAnimate();
    };
    this.paperScope.view.play();
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
        this.shape = new this.paperScope.Path.RegularPolygon({
          center: this.paperScope.view.center,
          sides: 3,
          radius: width / 2,
          fillColor: color
        });
        break;

      case 'RECTANGLE':
        this.shape = new this.paperScope.Path.Rectangle({
          point: this.paperScope.view.center.subtract(new this.paperScope.Point(width / 2, height / 2)),
          size: [width, height],
          fillColor: color
        });
        break;
      case 'CIRCLE':
        this.shape = new this.paperScope.Path.Circle({
          center: this.paperScope.view.center,
          radius: width / 2,
          fillColor: color
        });
        break;
    }
    const eyeWhiteLeft = new this.paperScope.Path.Circle({
      center: this.shape.position.subtract(new this.paperScope.Point(width / 4, height / 10)),
      radius: eyeSize,
      fillColor: 'white'
    })
    const eyeWhiteRight = new this.paperScope.Path.Circle({
      center: this.shape.position.subtract(new this.paperScope.Point(-width / 4, height / 10)),
      radius: eyeSize,
      fillColor: 'white'
    })
    this.pupilLeft = new this.paperScope.Path.Circle({
      center: eyeWhiteLeft.position.add(new this.paperScope.Point(0, eyeSize * 0.1)),
      radius: pupilSize,
      fillColor: 'black'
    })
    this.pupilRight = new this.paperScope.Path.Circle({
      center: eyeWhiteRight.position.add(new this.paperScope.Point(0, eyeSize * 0.1)),
      radius: pupilSize,
      fillColor: 'black'
    })

    this.eyeRight = new this.paperScope.Group({
      children: [this.shape, eyeWhiteRight, this.pupilRight]
    })

    this.eyeLeft = new this.paperScope.Group({
      children: [this.shape, eyeWhiteLeft, this.pupilLeft]
    })

    this.shapePath = new this.paperScope.Group({
      children: [this.shape, this.eyeLeft, this.eyeRight]
    })
  }
  onAnimate() {
    if(this.eyeLeft && this.eyeRight) {
      this.eyeLeft.scale(this.blinkScales[this.animationFrame]);
      this.eyeRight.scale(this.blinkScales[this.animationFrame]);
      this.animationFrame++;
      if (this.animationFrame >= this.blinkScales.length) {
        this.animationFrame = 0;
      }
    }

  }

  onMouseMove(e) {
    //this.positionPupils(e);
  }

  positionPupils(event) {
    //console.log(event)
    var vector = new Point(event.x - 300, event.y - 300);
    vector.length = Math.min(30, vector.length);
    this.pupilLeft.position = this.eyeLeft.position + vector;

    vector = new Point(event.x - 500, event.y - 300);
    vector.length = Math.min(30, vector.length);
    this.pupilRight.position = this.eyeRight.position + vector;
  }
}
