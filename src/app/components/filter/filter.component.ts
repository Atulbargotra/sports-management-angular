import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2,AfterViewInit} from '@angular/core';
import {faFilter} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit,AfterViewInit {
  
  categoryValue: string = 'None';
  faFilter=faFilter;


  //getting categories of all events from parent component
  @Input() categories: string[];

  @Output() filterValue = new EventEmitter<string>();

  @ViewChild('btn') btn:ElementRef; 

  constructor(private renderer : Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.btn.nativeElement,'click',(event)=>{
      this.renderer.setStyle(this.btn.nativeElement,'backgroundColor','red')
    }) 
  }



  ngOnInit(): void {}

  sendFilterValue(value: string) {
    this.filterValue.emit(value);
  } 
}
