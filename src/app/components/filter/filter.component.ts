import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  selectedLocation:string;
  @Output() filterValue = new EventEmitter<string>();

  ngOnInit(): void {}

  sendFilterValue(value: string) {
    console.log('In Child component : ' + value);
    this.filterValue.emit(value);
  }
}
