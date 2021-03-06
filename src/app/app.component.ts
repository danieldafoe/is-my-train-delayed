import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetServiceUpdate,
         GetNewServiceUpdate } from '../app/store/actions/train.actions';
import { AppState } from './store/states/app.state';
import { Observable, Subscription } from 'rxjs';
import { GoApiResponseFailure,
         GoApiResponse,
         TrainStructure,
         Train,
         TrainNotification,
         TrainNotificationStructure } from './models/GoApiResponse';

@Component({
  selector: 'imtd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  serviceUpdate$: Observable<GoApiResponse>;
  delays: Array<{ train: string, trips: Array<string> }>;
  foo: GoApiResponse;

  constructor(private store: Store<AppState>) {
    // TODO: learn how to get specific slices of the store
    // so that I can grab just the serviceUpdate property of the AppState
    // instead of all of AppState
    this.serviceUpdate$ = this.store.select('serviceUpdate');
    this.store.select('serviceUpdate').subscribe(val => this.foo = val);

    this.serviceUpdate$.subscribe(serviceUpdate => {
      // TODO: figure out why this returns the entire app state
      // I think I know why, but how I can expect that it's going to be returned
      // so that I can simply do `serviceUpdate.trains`
      if (serviceUpdate.trains) {
        for (let i = 0; i < serviceUpdate.trains.train.length; i++) {
          const element: TrainNotificationStructure = (
            serviceUpdate.trains.train[i].notifications);

          for (let x = 0; x < serviceUpdate.trains.train[i].notifications.notification.length; x++) {
            const notification: TrainNotification = (
              serviceUpdate.trains.train[i].notifications[x]);

            if (notification.TripNumbers) {
              this.delays.push({
                train: serviceUpdate.trains.train[i].corridorCode,
                trips: notification.TripNumbers
              });
            }
          }
        }
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetServiceUpdate);
  }

  countSaagNotifications(train: Train): number {
    return train.saagNotifications.saagNotification.length;
  }

  hasDelay(train: Train): boolean {
    return (train.saagNotifications.saagNotification).length > 0;
  }

  refresh() {
    this.store.dispatch(new GetNewServiceUpdate);
  }

  toggleDelay(event: MouseEvent | KeyboardEvent | Event, train: Train): void {
    const delayRow: HTMLElement = event.target['parentElement'].parentElement.nextElementSibling;

    if (delayRow.classList.contains('delay-info')) {
      if (delayRow.classList.contains('delay-info--show')) {
        delayRow.classList.remove('delay-info--show');
      } else {
        delayRow.classList.add('delay-info--show');
      }
    }
  }
}
