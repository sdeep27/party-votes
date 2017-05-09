import {expect} from 'chai';
import {List, Map} from 'immutable';
import {setEntries, next, vote} from '../src/core';

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
    it('should create new pair and modify entries', () => {
      const state = Map({entries: List.of('Interstellar', 'Dark Knight', 'Mary Jane')})
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Interstellar', 'Dark Knight')
        }),
        entries: List.of('Mary Jane')
      }));
    });
    it('should move winner to entries and update pair', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Interstellar', 'Dark Knight'),
          tally: Map({
            'Interstellar': 4,
            'Dark Knight': 2
          })
        }),
        entries: List.of('Mary Jane', 'The Prestige')  
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Mary Jane', 'The Prestige'),
        }),
        entries: List.of('Interstellar')  
      })); 
    });
    it('should move pair in a draw to entries', () => {
      const state = Map({
        vote: Map({
          pair: List(['Interstellar', 'Dark Knight']),
          tally: Map({
            'Interstellar': 3,
            'Dark Knight': 3
          })
        }),
        entries: List(['Mary Jane', 'The Prestige'])
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List(['Mary Jane', 'The Prestige']),
        }),
        entries: List(['Interstellar', 'Dark Knight'])
      }));
    });
    it('should create a winner when nothing left to vote on', () => {
      const state = Map({
        vote: Map({
          pair: List(['Interstellar', 'The Prestige']),
          tally: Map({
            'Interstellar': 2,
            'The Prestige': 4
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'The Prestige'
      }));
    });
  });
  describe('vote', () => {
    it('should increment tally when 0', () => {
      const state = Map({
        pair: List.of('Interstellar, Dark Knight'),   
      })
      const nextState = vote(state, 'Interstellar');
      expect(nextState).to.equal(Map({
        pair: List.of('Interstellar, Dark Knight'),
        tally: Map({
          'Interstellar': 1
        })
      }))
    });
    it('should increment when tally exists', () => {
      const state = Map({
        pair: List.of('Interstellar', 'Dark Knight'),
        tally: Map({
          'Interstellar': 3,
          'Dark Knight': 2
        })
      });
      const nextState = vote(state, 'Dark Knight');
      expect(nextState).to.equal(Map({
        pair: List.of('Interstellar', 'Dark Knight'),
        tally: Map({
          'Interstellar': 3,
          'Dark Knight': 3
        })
      }));
    });
  });
})