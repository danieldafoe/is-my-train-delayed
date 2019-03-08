import { Action } from '@ngrx/store';
import { GoApiResponse, GoApiResponseFailure } from '../../models/GoApiResponse';

export const GET_SERVICE_UPDATE = '[Train] Get Service Update';
export const GET_SERVICE_UPDATE_SUCCESS = '[Train] Get Service Update Success';
export const GET_SERVICE_UPDATE_FAILURE = '[Train] Get Service Update Failure';

export class GetServiceUpdate implements Action {
  readonly type = GET_SERVICE_UPDATE;
}

export class GetServiceUpdateSuccess implements Action {
  readonly type = GET_SERVICE_UPDATE_SUCCESS;
  constructor(public payload: GoApiResponse) { }
}

export class GetServiceUpdateFailure implements Action {
  readonly type = GET_SERVICE_UPDATE_FAILURE;
  constructor(public payload: GoApiResponseFailure) { }
}

export type TrainActions = (
  GetServiceUpdate |
  GetServiceUpdateSuccess |
  GetServiceUpdateFailure
);
