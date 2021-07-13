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
  categories: string[];

  getFilterValue(value: string) {
    if (value.startsWith('/venue')) {
      let venue = value.split('=')[1];
      this.eventService.getEventsByVenue(venue).subscribe((data) => {
        this.eventList = data;
      });
    } else if (value.startsWith('/time')) {
      let time = value.split('=')[1];
      this.eventService.getEventsByTime(time).subscribe((data) => {
        this.eventList = data;
      });
    } else if (value.startsWith('/type')) {
      let type = value.split('=')[1];
      this.eventService.getEventByType(type).subscribe((data) => {
        this.eventList = data;
      });
    } else if (value === 'NONE') {
      this.eventService.getAllEvents().subscribe((data) => {
        this.eventList = data;
      });
    } else {
      this.eventService.getEventsByCategory(value).subscribe((data) => {
        this.eventList = data;
      });
    }
  }

  //Get all Published Events here
  getEventList() {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.eventAvailable = true;
        this.eventList = data;
        this.filterEventList = data;

        //getting categories of all the event in an array
        const categoryDuplicates = data.map((ev) => ev.category);
        this.categories = categoryDuplicates.filter(
          (item, i, ar) => ar.indexOf(item) === i
        );
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
