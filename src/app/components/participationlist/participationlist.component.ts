import { Component, Input, OnInit } from '@angular/core';
import {EventResponsePayload} from '../../Model/eventResponsePayload'

@Component({
  selector: 'app-participationlist',
  templateUrl: './participationlist.component.html',
  styleUrls: ['./participationlist.component.css']
})
export class ParticipationlistComponent implements OnInit {

  constructor() { }
  
  @Input() event:EventResponsePayload;
  @Input() text: string;

  ngOnInit(): void {
  }

}
