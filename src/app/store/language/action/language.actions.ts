import { createAction, props } from '@ngrx/store';
import { ELanguage } from '../language.consts';

export const setLanguage = createAction(
  '[Language] Set language',
  props<{language: ELanguage}>()
)
