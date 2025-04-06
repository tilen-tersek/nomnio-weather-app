import {createReducer, on} from "@ngrx/store";
import {ILoadingState} from "../loading.model";
import {setLoading} from "../action/loading.action";

const initialState: ILoadingState = {
  loading: true,
}

export const loadingReducer = createReducer(
  initialState,
  on(setLoading, (state, {loading}): ILoadingState => {
    return {...state, loading }
  })
)
