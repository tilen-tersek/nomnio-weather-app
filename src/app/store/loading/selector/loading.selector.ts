import { createFeatureSelector } from "@ngrx/store";
import {ILoadingState} from "../loading.model";

export const selectLoadingState = createFeatureSelector<ILoadingState>('loading')
