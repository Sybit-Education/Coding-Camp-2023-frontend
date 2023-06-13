import {createReducer, on} from "@ngrx/store";
import * as actions from './sygotchi.actions'

export const initialState: any = null

export const sygotchiReducer = createReducer(
  initialState,
  on(actions.setSygotchi, (_state, { sygotchi }) => sygotchi)
)
