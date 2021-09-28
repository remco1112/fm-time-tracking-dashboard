import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TimeMode } from '../time-mode';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() profileUrl: string = '';
  @Input() profileName: string = '';
  @Input() currentTimeMode: TimeMode = TimeMode.DAILY;

  @Output() timeModeSwitchEvent: EventEmitter<TimeMode> = new EventEmitter<TimeMode>();

  public TimeMode = TimeMode;

  constructor() { }

  ngOnInit(): void {
  
  }

  setTimeMode(mode: TimeMode): void {
    this.currentTimeMode = mode;
    this.timeModeSwitchEvent.emit(mode);
  }

}
