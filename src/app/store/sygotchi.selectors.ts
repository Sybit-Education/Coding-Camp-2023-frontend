import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SyGotchi} from "../entities/syGotchi";

export const selectSygotchiFeature = createFeatureSelector<SyGotchi>('sygotchi')

export const selectSygotchi = createSelector(selectSygotchiFeature, state => state)
