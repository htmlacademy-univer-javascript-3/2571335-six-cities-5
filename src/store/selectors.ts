
import {State} from './index.ts'
import { AuthorizationStatus } from '../mocks/login';
import { NAMESPACE } from '../mocks/sliceHeaders';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NAMESPACE.USER].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NAMESPACE.USER].authorizationStatus !== AuthorizationStatus.Unknown;