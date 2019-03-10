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

  hasDelay(train: Train): boolean {
    return (train.saagNotifications.saagNotification).length > 0;
  }

  countSaagNotifications(train: Train): number {
    return train.saagNotifications.saagNotification.length;
  }

  ngOnInit() {
    this.store.dispatch(new GetServiceUpdate);
  }

  refresh() {
    this.store.dispatch(new GetNewServiceUpdate);
  }
}
