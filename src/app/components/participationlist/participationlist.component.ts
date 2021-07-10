import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventResponsePayload } from '../../Model/eventResponsePayload';

@Component({
  selector: 'app-participationlist',
  templateUrl: './participationlist.component.html',
  styleUrls: ['./participationlist.component.css'],
})
export class ParticipationlistComponent implements OnInit {
  constructor() {}
  @Output() handleOnClick = new EventEmitter<EventResponsePayload>();
  @Input() event: EventResponsePayload;
  @Input() text: string;

  ngOnInit(): void {}
  onClick(event: EventResponsePayload) {
    this.handleOnClick.emit(event);
  }
}
