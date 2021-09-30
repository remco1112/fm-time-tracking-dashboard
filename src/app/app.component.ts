import { Component, ViewChild } from '@angular/core';
import { concat, merge, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Activity } from './activity';
import { DataService } from './data.service';
import { TimeMode } from './time-mode';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fm-time-tracking-dashboard';

  Activity = Activity;

  @ViewChild(UserComponent) userComponent!: UserComponent;

  loading = true;

  currentTime: {[key in Activity]: number} = {
    'Work': 0,
    'Play': 0,
    'Study': 0,
    'Exercise': 0,
    'Social': 0,
    'Self Care': 0
  }

  previousTime: {[key in Activity]: number} = {
    'Work': 0,
    'Play': 0,
    'Study': 0,
    'Exercise': 0,
    'Social': 0,
    'Self Care': 0
  }

  constructor(private dataService: DataService) {

  }

  ngAfterViewInit(): void {
    concat(
      of(TimeMode.DAILY),
      this.userComponent.timeModeSwitchEvent
    ).pipe(switchMap((mode) => {
      this.loading = true;
      return this.dataService.getForTimeMode(mode)
    }))
     .subscribe(result => {
       result.forEach((value, key) => {
         this.currentTime[key] = value.current;
         this.previousTime[key] = value.previous;
       })
       this.loading = false;
     })
  }
}
