import { Component, Input, OnInit } from '@angular/core';
import { MatchResponse } from 'src/app/Model/matchResponse';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css'],
})
export class MatchCardComponent implements OnInit {
  @Input() match: MatchResponse;
  constructor() {}

  ngOnInit(): void {}
}
