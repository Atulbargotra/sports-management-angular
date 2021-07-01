import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../services/event.service';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {
  @Input() event: EventResponsePayload;
  @Input() text: string;
  @Output() onRegisterEvent: EventEmitter<EventResponsePayload> =
    new EventEmitter();
  constructor(
    private route: Router,
    private toast: ToastrService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {}
  onRegister(event) {
    this.onRegisterEvent.emit(event);
  }
}
