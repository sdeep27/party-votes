import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store with the right reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());
    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Interstellar', 'Dark Knight']
    });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Interstellar', 'Dark Knight']
    }));
  });
});