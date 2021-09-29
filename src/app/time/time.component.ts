import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Activity } from '../activity';

@Component({
  selector: 'time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit {
  readonly classMap: ReadonlyMap<Activity, string> = new Map([
    [Activity.WORK, "work"],
    [Activity.PLAY, "play"],
    [Activity.STUDY, "study"],
    [Activity.EXERCISE, "exercise"],
    [Activity.SOCIAL, "social"],
    [Activity.SELFCARE, "self-care"]
  ]);

  @HostBinding('className') cls = 'work';

  @Input() currentTime: string = '';
  @Input() previousTime: string = '';
  _type: Activity = Activity.WORK;

  @Input() set type(value: Activity) {
    this._type = value;
    this.cls = this.classMap.get(value)!;
  }

  constructor() { }

  ngOnInit(): void {  }

}
