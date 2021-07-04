import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {EventService} from '../../services/event.service'
import {EventRequestPayload} from '../../Model/eventRequestPayload'

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {

  

  event:EventRequestPayload;

  //Edit Event form
  eventName: string;
  description: string;
  location: string;
  category: string;
  type: string;
  eventDate: string;
  lastDate: string;
  maxParticipant: number;
  picture: string;
  maxMembersInTeam: number;
  venue: string;

  constructor(
    private eventService:EventService,
    private toast: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res=>{
    let pid = +res.get('id');  // + is added to convert pid from string type to number   
    this.handleGetEventById(pid); 
      
    })
  }

  handleGetEventById(id: number) {
    this.eventService.getEventById(id).subscribe(
      (getRes) => {
        this.event = getRes;
        console.log(this.event) 
      },
      (error) => {
        this.toast.error('Problem Occured');
        console.log(error);
      }
    );
  }


  //To add a field Total members in a team
  isTeam(){
    return this.event.type=='TEAM'?true:false;    
  }


  setPicture(){
    switch(this.category){
      case 'cricket':{
         this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/cricket.jpeg?alt=media&token=142af2aa-52c5-49ef-93e0-964bb3651e8d';
         break;
        }
        case 'football':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/football.jpg?alt=media&token=41fd1240-1e99-48f4-bbaf-afaffcf057cf';
          break;
         }
         case 'basketball':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/basketball.jpeg?alt=media&token=d1bad8a4-9246-4900-b00e-2fc1823b94d7';
          break;
         }
         case 'badmintion':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/badmintion.jpeg?alt=media&token=4f1feac8-fb9a-4b8a-a879-e600374a1286';
          break;
         }
         case 'chess':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/chess.jpeg?alt=media&token=506d50ee-fb2e-48cc-aac4-433394248fd0';
          break;
         }
         case 'volleyball':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/vollyball.jpeg?alt=media&token=43409a2d-464a-4981-a36a-d755575ad104';
          break;
         }
         case 'tableTennis':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/tableTennis.jpeg?alt=media&token=7dba7ea1-f52c-49e2-8693-8ce69633ad5e';
          break;
         }
         case 'carrom':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/carrom%20(2).jpg?alt=media&token=3c1c7fcf-073a-4d74-a8e3-ed18edcd52e4';
          break;
         }
         case '8ballpool':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/stephen-collins-cRhNdY9-2Sc-unsplash%20(1).jpg?alt=media&token=12532bb2-beb6-4b42-8428-8a088be3df8e';
          break;
         }
      default: {
        this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/no-image.jpg?alt=media&token=94024470-52dd-4457-810d-e6b437dfddb0';
        break;
      }
  }
  }


}
