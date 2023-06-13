import {createAction, props} from "@ngrx/store";
import {SyGotchi} from "../entities/syGotchi";

export const setSygotchi = createAction('[Sygotchi] sets current sygotchi',
  props<{sygotchi: SyGotchi}>())
