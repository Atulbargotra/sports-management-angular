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
  filterValue: string;

  getFilterValue(value: string) {
    this.filterValue = value;
    console.log('In Parent component : ' + this.filterValue);
  }

  //Get all Published Events here
  getEventList() {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.eventAvailable = true;
        this.eventList = data;
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
