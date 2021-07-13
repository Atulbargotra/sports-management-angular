import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  eventName: string;
  

  constructor(
    private eventService:EventService
  ) { }

  @Input() event:EventResponsePayload;
  @Input() analyse:string;

  @Output() FeedbackEventName = new EventEmitter<string>();
  ngOnInit(): void {
    console.log(this.analyse);
  }


  getEventById(id:number){
    this.eventService.getEventById(id).subscribe((data)=>{
      const {eventName} = data;

      this.eventName = eventName;
      this.FeedbackEventName.emit(this.eventName);
    })      
  }


}
