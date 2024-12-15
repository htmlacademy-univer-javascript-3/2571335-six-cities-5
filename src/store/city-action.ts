import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../mocks/login.ts';


export const redirectToRoute = createAction<AppRoute>('city/redirectToRoute');
