import {fromJS, Map} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('should handle SET_ENTRIES', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Interstellar']}
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Interstellar']
    }));
  });
  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Interstellar', 'Dark Knight', 'The Prestige']
    })
    const action = {type: 'NEXT'}
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'Dark Knight']
      },
      entries: ['The Prestige']
    }));
  });
  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Interstellar', 'Dark Knight']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Interstellar'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Interstellar', 'Dark Knight'],
        tally: {Interstellar: 1}
      },
      entries: []
    }));
  });
  it('handles reducing a set of actions into the final state', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Interstellar','Dark Knight']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Interstellar'},
      {type: 'VOTE', entry: 'Dark Knight'},
      {type: 'VOTE', entry: 'Interstellar'},
      {type: 'NEXT'},
    ]
    const finalState = actions.reduce(reducer, Map());
    expect(finalState).to.equal(fromJS({
      winner: 'Interstellar'
    }));
  });
});