import React from 'react';
import {List} from 'immutable';
import Winner from './Winner';
import {connect} from 'react-redux';

export function Results ({pair, tally, next, winner}) {
  function getPair() {
    return pair || [];
  }
  function getVotes(item) {
    if (tally && tally.has(item)) return tally.get(item)
    return 0;
  }
  return (
    winner ? <Winner winner ={winner}/> :
    <div className="results">
      <div className="tally">
        {getPair().map(item =>
          <div key={item} className="item">
            <h1>{item}</h1>
            <div className="voteCount">
              {getVotes(item)}
            </div>
          </div>
        )}
      </div>
      <div className="management">
        <button 
                className="next"
                onClick={next}>
          Next
        </button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    pair: state.getIn(['voting','pair']),
    tally: state.getIn(['voting','tally']),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(mapStateToProps)(Results);