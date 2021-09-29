import { Component } from '@angular/core';
import { Activity } from './activity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fm-time-tracking-dashboard';

  Activity = Activity;
}
