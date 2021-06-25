import { Component, OnInit } from '@angular/core';

//toastr message
import { ToastrService } from 'ngx-toastr';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';

//service
import { EventService } from 'src/app/services/event.service';

//trash icon
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


//date formating
import { throwError } from 'rxjs';

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.css'],
})
export class PublishedComponent implements OnInit {
  
  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  eventAvailable:boolean = false;
  eventList: EventResponsePayload[];  //eventList array holding Published Events
  faTrashAlt = faTrashAlt;

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      if(data.length===0){
        this.eventAvailable = false;
        this.eventList = data;
      }
      else{
        this.eventList = data;
        this.eventAvailable = true;
      }
      

    },(error) => {
      throwError(error);
      this.toastr.error("Failed")
    })
  }
  handleEventDelete(id: number){
    this.eventService.deleteEvent(id).subscribe((data) => {
      this.eventList.filter((draft) => draft.id !== id);
      this.toastr.success("Published Deleted")
    },(error) => {
      throwError(error);
      this.toastr.error("Failed")
    })
  }
  
}
