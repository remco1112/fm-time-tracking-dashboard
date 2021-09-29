import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit {

  @HostBinding('className') cls = 'work';

  constructor() { }

  ngOnInit(): void {
  }

}
