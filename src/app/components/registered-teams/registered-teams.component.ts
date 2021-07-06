import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamDetailsPayload } from 'src/app/Model/teamDetailsPayload';

@Component({
  selector: 'app-registered-teams',
  templateUrl: './registered-teams.component.html',
  styleUrls: ['./registered-teams.component.css'],
})
export class RegisteredTeamsComponent implements OnInit {
  constructor() {}

  @Input() team: TeamDetailsPayload;
  @Output() onClickAskToJoin = new EventEmitter();
  ngOnInit(): void {}
  onJoin(team) {
    this.onClickAskToJoin.emit(team);
  }
}
