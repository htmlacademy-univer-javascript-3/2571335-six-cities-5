import {combineReducers} from '@reduxjs/toolkit';
import {NAMESPACE} from '../mocks/slice-headers.ts';
import { dataProcess } from './data-process/data-process.ts';
import { cityProcess } from './city-process/city-process.ts';
import { userProcess } from './user-process/user-process.ts';

export const rootReducer = combineReducers({
  [NAMESPACE.USER]: userProcess.reducer,
  [NAMESPACE.DATA]: dataProcess.reducer,
  [NAMESPACE.CITY]: cityProcess.reducer,
});

