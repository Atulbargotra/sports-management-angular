import { Component, OnInit } from '@angular/core';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import { EventService } from 'src/app/services/event.service';
import * as Moment from 'moment';

@Component({
  selector: 'app-participated-events',
  templateUrl: './participated-events.component.html',
  styleUrls: ['./participated-events.component.css'],
})
export class ParticipatedEventsComponent implements OnInit {
  eventList: EventResponsePayload[];
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getRegisteredEvents('not-closed').subscribe(
      (data) => {
        // let today = Moment().format('YYYY-MM-DD');
        // this.eventList = data.filter(ev=>ev.eventDate>today);
        this.eventList = data;
      },
      (error) => {}
    );
  }
  unregister(event: EventResponsePayload) {
    this.eventService.unregister(event.id).subscribe(() => {
      this.eventList = this.eventList.filter(
        (lEvent) => lEvent.id !== event.id
      );
    });
  }
}
