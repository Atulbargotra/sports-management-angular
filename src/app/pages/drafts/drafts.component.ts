import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import { EventService } from 'src/app/services/event.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css'],
})
export class DraftsComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  drafts: EventResponsePayload[];
  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.eventService.getEventDrafts().subscribe(
      (data) => {
        this.drafts = data;
      },
      (error) => {
        this.toastr.error('Unable to fetch drafts');
      }
    );
  }
  onPublish(draft) {
    this.eventService.publishDraftEvent(draft.id).subscribe(
      (data) => {
        this.drafts = this.drafts.filter((draftL) => draftL.id !== draft.id);
        this.toastr.success('Published Event');
      },
      (error) => {
        throwError(error);
        this.toastr.error('Failed');
      }
    );
  }
  onDelete(draft) {
    this.eventService.deleteEvent(draft.id).subscribe(
      (data) => {
        this.drafts = this.drafts.filter((draftL) => draftL.id !== draft.id);
        this.toastr.success('Published Deleted');
      },
      (error) => {
        throwError(error);
        this.toastr.error('Failed');
      }
    );
  }
}
