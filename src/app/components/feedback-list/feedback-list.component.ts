import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent implements OnInit {
  eventName: string;

  constructor(private eventService: EventService) {}

  @Input() event: EventResponsePayload;

  @Output() onClickFeedback = new EventEmitter<EventResponsePayload>();
  ngOnInit(): void {}
  feedback(event: EventResponsePayload) {
    this.onClickFeedback.emit(event);
  }
}
