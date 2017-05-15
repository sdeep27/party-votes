import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/';

describe('reducer', () => {
  it('should create new state from server SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List(['The Prestige', 'Interstellar']),
          tally: Map({
            'The Prestige': 3,
            'Interstellar': 2
          })
        })
      })
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['The Prestige', 'Interstellar'],
        tally: {
            'The Prestige': 3,
            'Interstellar': 2
            }
      }
    }));
  });
})