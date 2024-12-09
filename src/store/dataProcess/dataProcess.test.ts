import { dataProcessStoreMock } from '../../mocks/storeMock.ts';
import {dataProcess} from './dataProcess.ts';


describe('Data slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = dataProcessStoreMock;

    const result = dataProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = dataProcessStoreMock;

    const result = dataProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

});


