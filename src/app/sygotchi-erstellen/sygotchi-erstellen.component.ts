import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as paper from 'paper';
import { Eye } from '../enums/eye.enum';
import { Project } from "paper";
import {Store} from "@ngrx/store";
import {setSygotchi} from "../store/sygotchi.actions";
import {ActionsService} from "../services/actions.service";
import {WebsocketService} from "../services/websocket.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-sygotchi-erstellen',
  templateUrl: './sygotchi-erstellen.component.html',
  styleUrls: ['./sygotchi-erstellen.component.scss']
})
export class SygotchiErstellenComponent implements OnInit{
  characterForm: FormGroup;
  eyes:string[] = Object.values(Eye);
  canvas: any;
  shape: any;
  shapePath: any;

  constructor(private formBuilder: FormBuilder, private store: Store, private actionsService: ActionsService, private wsService: WebsocketService, private router: Router){
    this.characterForm = this.formBuilder.group({
      name: ['',Validators.required],
      shape: ['RECTANGLE',Validators.required],
      color: ['#EFD3D2',Validators.required],
      width: [100,Validators.required],
      height: [100,Validators.required],
      eyes: [1,Validators.required],
      eyeSize: [0.2, Validators.required]

    })

  }
  ngOnInit(){
    window['paper'] = paper;
    new Project('canvas');

    this.canvas = paper.project.activeLayer;
    this.drawShape();
    this.characterForm.valueChanges.subscribe(() =>{
      this.drawShape();
    });
  }
  drawShape(){
    if(this.shapePath){
      this.shapePath.remove();
    }
    const shapeType = this.characterForm.value.shape;
    const color = this.characterForm.value.color;
    const width = this.characterForm.value.width;
    const height = this.characterForm.value.height;
    const eyes = this.characterForm.value.eyes;
    let eyeSize;
    let pupilSize;

    switch(eyes){

      case 1:
        eyeSize = Math.min(width, height) * 0.1;
        pupilSize = eyeSize * 0.5;
      break;

      case 2:
        eyeSize = Math.min(width, height) * 0.2;
        pupilSize = eyeSize * 0.5;
      break;

      case 3:
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

  createShape() {
    const characterData = this.characterForm.value;
    let eye: Eye = Eye.SMALL
    switch (characterData.eyes) {
      case 1:
        eye = Eye.SMALL
        break;
      case 2:
        eye = Eye.MEDIUM
        break;
      case 3:
        eye = Eye.LARGE
        break;
    }

    this.actionsService.createSygotchi(characterData.name, eye, characterData.shape, characterData.color, characterData.height, characterData.width).subscribe(result => {
      this.store.dispatch(setSygotchi({sygotchi: result as any}))
      this.wsService.initializeWebSocketConnection(result.id)

      this.router.navigate(['/bedroom']);
    })
  }
}

