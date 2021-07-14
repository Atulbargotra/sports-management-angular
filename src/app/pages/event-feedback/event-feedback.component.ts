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
  isLoaded = false;
  barChartLabels = [];
  barChartData = [];
  barChartType = 'bar';
  chartOptions: any = {
    legend: {
      display: true,
      labels: { fontColor: 'black' },
      responsive: true,
      maintainAspectRatio: false,
      showScale: false,
      scaleShowVerticalLines: false,
    },
  };
  barChartDataObj = {
    data: [],
    label: 'User Ratings',
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
    ],
    borderWidth: 1,
  };
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.eventId = +res.get('id');
    });
    this.fetchFeedback();
  }

  fetchFeedback() {
    this.eventService.getAllFeedbacks(this.eventId).subscribe((data) => {
      console.log(data);
      let starRatings = [1, 2, 3, 4, 5];
      for (var i = 0; i < 5; i++) {
        if (data.ratings[starRatings[i]]) {
          let value = data.ratings[starRatings[i]];
          this.barChartLabels.push(starRatings[i]);
          this.barChartDataObj.data.push(value);
        } else {
          this.barChartLabels.push(starRatings[i]);
          this.barChartDataObj.data.push(0);
        }
      }
      this.barChartData.push(this.barChartDataObj);
      this.comments = data.feedback;
      this.isLoaded = true;
    });
  }
}
