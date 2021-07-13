import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { EventResponsePayload } from '../../Model/eventResponsePayload';
import * as Moment from 'moment';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {
  expiredEventAvailable: boolean;
  eventList: EventResponsePayload[];
  eventAvailable: boolean;

  constructor(
    private eventService:EventService
  ) { }


  ngOnInit(): void {
    this.getExpiredEvents();
  }

  getExpiredEvents() {
    this.eventService.getExpiredEvents().subscribe(
      (data) => {
        if (data.length === 0) {
          this.eventAvailable = false;
        } else {
          this.eventAvailable = true;
          this.eventList = data;
          console.log(data);
        }
      },

      (error) => {
        console.log("Unable to fetch expired event")
      }
    );
  }
}
