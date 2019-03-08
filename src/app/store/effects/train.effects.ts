import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import {
  GetServiceUpdateSuccess,
  GetServiceUpdateFailure
} from '../actions/train.actions';
import { switchMap, catchError } from 'rxjs/operators';
import { TrainService } from 'src/app/services/train.service';
import { of } from 'rxjs';

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
    switchMap((res) => of(new GetServiceUpdateSuccess(res))),
    catchError((err) => of(new GetServiceUpdateFailure(err)))
  );
}
