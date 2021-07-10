import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { EventResponsePayload } from '../../Model/eventResponsePayload';
import * as Moment from 'moment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  constructor(private eventService: EventService) {}

  message: string;
  eventList: EventResponsePayload[];
  eventName:string;
  expiredEventAvailable: boolean = false;
  formAvailable:boolean=false;

  ngOnInit(): void {
    this.getClosedEvents();
  }

  getClosedEvents() {
    this.eventService.getRegisteredEvents().subscribe(
      (data) => {
        let today = Moment().format('YYYY-MM-DD');
        this.eventList = data.filter((ev) => ev.lastDate < today);
        if (this.eventList.length > 0) {
          this.expiredEventAvailable = true;
        } else {
          this.expiredEventAvailable = false;
        }
      },
      (error) => {}
    );
  }

  getRating(value: string) {
    switch (value) {
      case 'worst': {
        this.message = 'Sorry to heard that 😢! Thank you for the feedback';
        break;
      }
      case 'poor': {
        this.message = 'Sorry to heard that 😒! Thank you for the feedback';
        break;
      }
      case 'okay': {
        this.message = 'OK! Thank you 😐';
        break;
      }
      case 'good': {
        this.message = 'Good! Thank you 😏';
        break;
      }
      case 'great': {
        this.message = 'Great! Thank you 😁';
        break;
      }
      default:{
        this.message = "ThankYou!!"
        break;
      }
    }
  }

  getFeedbackEventName(name:string)
  {
    this.eventName = name;
    this.formAvailable = name?true:false;
  }
}
