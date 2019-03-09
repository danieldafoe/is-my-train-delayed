import { GoApiResponseFailure, GoApiResponse } from 'src/app/models/GoApiResponse';

export interface AppState {
  readonly loading: boolean;
  readonly error?: GoApiResponseFailure;
  readonly serviceUpdate: GoApiResponse;
}
