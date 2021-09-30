import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Activity } from './activity';
import { TimeMode } from './time-mode';

export type Data = ReadonlyMap<Activity, {"current": number, "previous": number}>

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getForTimeMode(mode: TimeMode) {
    return this.http.get<{
      "title": string,
      "timeframes": {
        "daily": {
          "current": number,
          "previous": number
        },
        "weekly": {
          "current": number,
          "previous": number
        },
        "monthly": {
          "current": number,
          "previous": number
        }
      }
    }[]>('assets/data.json').pipe(map((response) => {
      return new Map(response.map(item => {
        return [item.title as Activity, item.timeframes[mode.toLowerCase() as 'daily' | 'weekly' | 'monthly']]
      }))
    }), delay(1000));
  }
}
