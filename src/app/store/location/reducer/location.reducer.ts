import {createReducer, on} from "@ngrx/store";
import {setLocation} from "../action/location.actions";
import {ILocationState} from "../location.model";

const initialState: ILocationState = {
  location: '',
}

export const locationReducer = createReducer(
  initialState,
  on(setLocation, (state, { location }): ILocationState => {
    return { ...state, location };
  }),
);
