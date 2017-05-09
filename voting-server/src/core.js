import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
};

function getWinners(vote){
  if (!vote) return [];
  const [a,b] = vote.get('pair');
  const aTally = vote.getIn(['tally', a], 0);
  const bTally = vote.getIn(['tally', b], 0);
  if (aTally > bTally) return [a];
  else if (bTally > aTally) return [b];
  else return [a, b];
}

export function next(state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote').remove('entries').set('winner', entries.first());
  }
  else return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
};

export function vote(voteState, item) {
  return voteState.updateIn(['tally', item], (item = 0) => ++item);
}

export const INITIAL_STATE = Map();