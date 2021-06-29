import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { winnersDetailsPayload } from '../../Model/winnersDetailsPayload';

import { EventResponsePayload } from '../../Model/eventResponsePayload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announce-winner',
  templateUrl: './announce-winner.component.html',
  styleUrls: ['./announce-winner.component.css'],
})
export class AnnounceWinnerComponent implements OnInit {
  w1: string;
  w2: string;
  w3: string;
  eventList: EventResponsePayload[];
  eventAvailable: boolean = false;

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleAnnouncedEventDetails();
  }

  handlePostWinnerDetails(eventId: number, f: NgForm) {
    const winnersDetails: winnersDetailsPayload = {
      w1: this.w1,
      w2: this.w2,
      w3: this.w3,
    };
    this.eventService.postWinnnerDetails(eventId, winnersDetails).subscribe(
      (data) => {
        this.eventList = this.eventList.filter((event) => event.id !== eventId);
        this.toastr.success('Winners Announced');
      },
      (error) => {
        this.toastr.error('Error occured while anouncing winners');
        f.reset();
      }
    );
  }

  clearDataOnDiscard(f: NgForm) {
    f.reset();
  }

  handleAnnouncedEventDetails() {
    this.eventService.getExpiredEvents().subscribe(
      (data) => {
        this.eventAvailable = true;
        this.eventList = data;
      },

      (error) => {
        this.toastr.error('Problem Occured while fetching events');
      }
    );
  }
}
