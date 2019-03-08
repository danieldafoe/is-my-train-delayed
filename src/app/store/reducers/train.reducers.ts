import { AppState } from '../states/app.state';
import { TrainActions,
         GET_SERVICE_UPDATE,
         GET_SERVICE_UPDATE_SUCCESS,
         GET_SERVICE_UPDATE_FAILURE
} from '../actions/train.actions';

export const initialState: AppState = {
  loading: false,
  serviceUpdate: null
};

export function trainReducers(state = initialState, action: TrainActions) {
  switch (action.type) {
    case GET_SERVICE_UPDATE:
      return { ...state, loading: true };

    case GET_SERVICE_UPDATE_SUCCESS:
      return { ...state, loading: false, serviceUpdate: action.payload };

    case GET_SERVICE_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
