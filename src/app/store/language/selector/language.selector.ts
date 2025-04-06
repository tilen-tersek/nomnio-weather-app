import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ILanguageState } from '../language.model';

export const selectLanguageState = createFeatureSelector<ILanguageState>('language');

export const selectLanguage = createSelector(
  selectLanguageState,
  (state: ILanguageState) => state.language
);
