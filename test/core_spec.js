import {expect} from 'chai';
import {List, Map} from 'immutable';
import {setEntries, next} from '../src/core';

describe('core functions', () => {
  describe('setEntries', () => {
    const state = Map();
    const entries = List.of('Interstellar', 'Dark Knight');
    it('should create new state with entries', () => {
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Interstellar', 'Dark Knight')
      }));
    });
  });
  describe('next', () => {
    const state = Map({entries: List.of('Interstellar', 'Dark Knight', 'Mary Jane')})
    it('should create new pair and modify entries', () => {
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Interstellar', 'Dark Knight')
        }),
        entries: List.of('Mary Jane')
      }));
    });
  });
});