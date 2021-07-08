import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchResponse } from 'src/app/Model/matchResponse';
import { ScheduleResponse } from 'src/app/Model/scheduleResponse';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) {}
  eventId: number;
  schedule: ScheduleResponse;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.eventId = +res.get('id');
    });
    this.fetchSchedule(this.eventId);
  }
  fetchSchedule(eventId: number) {
    this.eventService.getSchedule(eventId).subscribe((data) => {
      this.schedule = data;
    });
  }
}
