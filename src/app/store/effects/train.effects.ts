import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import {
  GetServiceUpdateSuccess,
  GetServiceUpdateFailure
} from '../actions/train.actions';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { TrainService } from 'src/app/services/train.service';
import { of } from 'rxjs';
import { GoApiResponse } from 'src/app/models/GoApiResponse';

@Injectable()
export class TrainEffects {
  constructor(private _store: Store<AppState>,
              private _actions$: Actions,
              private trainService: TrainService) { }

  @Effect()
  getServiceUpdate$ = this._actions$.pipe(
    // tap((payload) => console.log(payload)),
    ofType('[Train] Get Service Update'),
    switchMap(() => this.trainService.getServiceUpdate()),
    switchMap((res) => of(
      new GetServiceUpdateSuccess(keyFirstLetterToLowercase(res)))),
    catchError((err) => of(
      new GetServiceUpdateFailure(err)))
  );

  @Effect()
  getNewServiceUpdate$ = this._actions$.pipe(
    // tap((payload) => console.log(payload)),
    ofType('[Train] Get New Service Update'),
    switchMap(() => this.trainService.getServiceUpdate()),
    switchMap((res) => of(
      new GetServiceUpdateSuccess(keyFirstLetterToLowercase(res)))),
    catchError((err) => of(
      new GetServiceUpdateFailure(err)))
  );
}

function keyFirstLetterToLowercase(json: {}): GoApiResponse {
  const obj = JSON.stringify(json);
  const newJson = obj.replace(/"([\w]+)":/g, function($0, $1) {
    const firstLetter = $1.charAt(0).toLowerCase();
    const restOfKey = $1.substr(1, $1.length);
    const joinedString = firstLetter + restOfKey;
    return ('"' + joinedString + '":');
  });
  return JSON.parse(newJson);
}
