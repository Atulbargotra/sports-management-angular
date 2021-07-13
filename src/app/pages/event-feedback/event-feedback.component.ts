import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrls: ['./event-feedback.component.css'],
})
export class EventFeedbackComponent implements OnInit {
  eventId: number;
  comments: Array<string>;
  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.eventId = +res.get('id');
    });
    this.fetchFeedback();
  }
  isLoaded = false;
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  fetchFeedback() {
    this.eventService.getAllFeedbacks(this.eventId).subscribe((data) => {
      this.comments = data.feedback;
      for (let key in data.ratings) {
        let value = data.ratings[key];
        this.pieChartLabels.push(key);
        this.pieChartData.push(value);
      }
      this.isLoaded = true;
    });
  }
}
