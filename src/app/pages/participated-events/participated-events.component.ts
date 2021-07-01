import { Component, OnInit } from '@angular/core';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-participated-events',
  templateUrl: './participated-events.component.html',
  styleUrls: ['./participated-events.component.css']
})
export class ParticipatedEventsComponent implements OnInit {
  eventList: EventResponsePayload[]
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getRegisteredEvents().subscribe((data) => {
      this.eventList = data;
    },(error) => {
      
    })
  }
  

}
