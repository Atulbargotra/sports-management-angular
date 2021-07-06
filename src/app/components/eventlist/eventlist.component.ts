import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../services/event.service';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {
  @Input() event: EventResponsePayload;
  @Input() text: string;
  @Input() showRegister: boolean;
  @Input() showPublish: boolean;
  @Input() showDelete: boolean;
  @Output() onRegisterEvent: EventEmitter<EventResponsePayload> =
    new EventEmitter();
  @Output() onDeleteDraft: EventEmitter<EventResponsePayload> =
    new EventEmitter();
  @Output() onPublishDraft: EventEmitter<EventResponsePayload> =
    new EventEmitter();

  //icons
  faEdit = faEdit;
  faUpload=faUpload;
  faTrashAlt=faTrashAlt;
  
  constructor(
    private route: Router,
    private toast: ToastrService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {}
  onRegister(event) {
    this.onRegisterEvent.emit(event);
  }
  onDelete(event) {
    this.onDeleteDraft.emit(event);
  }
  onPublish(event) {
    this.onPublishDraft.emit(event);
  }
}
