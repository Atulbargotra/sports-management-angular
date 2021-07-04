import { Component, OnInit } from '@angular/core';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css'],
})
export class WinnersComponent implements OnInit {
  eventList: EventResponsePayload[];
  eventAvailable: boolean = false;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEventsAndWinners().subscribe((data) => {
      this.eventAvailable = true;
      this.eventList = data;
    });
  }
}
