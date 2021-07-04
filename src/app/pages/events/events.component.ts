import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import { EventService } from '../../services/event.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getEventList();
  }

  eventAvailable: boolean = false;
  eventList: EventResponsePayload[];
  filterEventList: EventResponsePayload[];

  getFilterValue(value: string) {
    this.eventService.getAllEvents(value).subscribe((data) => {
      this.eventList = data;
    });
    // console.log(this.eventList);
    // switch (value) {
    //   case 'nextMonth': {
    //     this.eventList = this.filterEventList.filter((event) =>
    //       nextMonth(new Date(event.eventDate))
    //     );
    //     break;
    //   }
    //   case 'thisMonth': {
    //     this.eventList = this.filterEventList.filter((event) =>
    //       thisMonth(new Date(event.eventDate))
    //     );
    //     break;
    //   }
    //   case 'thisWeek': {
    //     this.eventList = this.filterEventList.filter((event) =>
    //       thisWeek(new Date(event.eventDate))
    //     );
    //     break;
    //   }
    //   case 'individual': {
    //     this.eventList = this.filterEventList.filter(
    //       (event) => event.type === 'INDIVIDUAL'
    //     );
    //     break;
    //   }
    //   case 'team': {
    //     this.eventList = this.filterEventList.filter(
    //       (event) => event.type === 'TEAM'
    //     );
    //     break;
    //   }
    //   case 'outdoor': {
    //     this.eventList = this.filterEventList.filter(
    //       (event) => event.venue === 'outdoor'
    //     );
    //     break;
    //   }
    //   case 'indoor': {
    //     this.eventList = this.filterEventList.filter(
    //       (event) => event.venue === 'indoor'
    //     );
    //     break;
    //   }
    // }
  }

  //Get all Published Events here
  getEventList() {
    this.eventService.getAllEvents('all').subscribe(
      (data) => {
        this.eventAvailable = true;
        this.eventList = data;
        this.filterEventList = data;
      },
      (error) => {
        this.toast.error('Unable to fetch events');
      }
    );
  }
  register(event) {
    this.eventService.register(event.id).subscribe(
      () => {
        this.eventList = this.eventList.filter(
          (eventL) => eventL.id !== event.id
        );
        this.toast.success('Registered');
      },
      (errorObj) => {
        throwError(errorObj);
        this.toast.error(errorObj.error.message);
      }
    );
  }
}
