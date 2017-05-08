import {expect} from 'chai';

describe('Immutability', () => {
  describe('number function', () => {
    function increment (currentState) {
      return currentState+1;
    }
    it('should not modify state', () => {
      const state = 1;
      const nextState = increment(state);
      expect(state).to.equal(1);
      expect(nextState).to.equal(2);
    });
  });
});