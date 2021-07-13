import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { EventResponsePayload } from '../../Model/eventResponsePayload';
import * as Moment from 'moment';
import { FeedbackRequest } from 'src/app/Model/feedbackRequest';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private toast: ToastrService,
    private router: Router
  ) {}

  message: string;
  eventList: EventResponsePayload[];
  eventName: string;
  expiredEventAvailable: boolean = false;
  formAvailable: boolean = false;
  rating: number;
  feedback: string;
  event: EventResponsePayload;

  ngOnInit(): void {
    this.getClosedEvents();
  }

  getClosedEvents() {
    this.eventService.getRegisteredEvents('closed').subscribe(
      (data) => {
        this.eventList = data;
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
        this.rating = 1;
        break;
      }
      case 'poor': {
        this.message = 'Sorry to heard that 😒! Thank you for the feedback';
        this.rating = 2;

        break;
      }
      case 'okay': {
        this.message = 'OK! Thank you 😐';
        this.rating = 3;

        break;
      }
      case 'good': {
        this.message = 'Good! Thank you 😏';
        this.rating = 4;
        break;
      }
      case 'great': {
        this.message = 'Great! Thank you 😁';
        this.rating = 5;

        break;
      }
      default: {
        this.message = 'ThankYou!!';
        break;
      }
    }
  }

  getEvent(event: EventResponsePayload) {
    this.event = event;
    this.formAvailable = this.event ? true : false;
  }
  postFeedback() {
    let feedbackRequest: FeedbackRequest = {
      message: this.feedback,
      rating: this.rating,
    };
    console.log(feedbackRequest);
    this.eventService.postFeedback(this.event.id, feedbackRequest).subscribe(
      () => {
        this.toast.success('Thankyou');
        this.router.navigateByUrl('/userhome');
      },
      (resObj) => {
        this.toast.error(resObj.error.message);
      }
    );
  }
}
