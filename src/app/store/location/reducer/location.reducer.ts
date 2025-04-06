import {createReducer, on} from "@ngrx/store";
import {setLocation} from "../action/location.actions";
import {ILocationState} from "../location.model";
import {ELanguage} from "../../language/language.consts";
import {LOCATION_KEY} from "../../../services/storage/consts";

const initialState: ILocationState = {
  location: (localStorage.getItem(LOCATION_KEY) ?? '')

}

export const locationReducer = createReducer(
  initialState,
  on(setLocation, (state, { location }): ILocationState => {
    return { ...state, location };
  }),
);
