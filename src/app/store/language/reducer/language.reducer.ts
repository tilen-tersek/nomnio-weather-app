import {ILanguageState} from '../language.model';
import {ELanguage} from "../language.consts";
import {createReducer, on} from "@ngrx/store";
import {setLanguage} from "../action/language.actions";

const initialState: ILanguageState = {
  language: ELanguage.Slovene
}

export const languageReducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }): ILanguageState => {
    return { ...state, language };
  }),
);
