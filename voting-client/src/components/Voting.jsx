import React from 'react';
import Vote from './Vote';
import Winner from './Winner';
import {connect} from 'react-redux';

export class Voting extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.winner ? 
        <Winner ref="winner" winner={this.props.winner}/> :
        <Vote {...this.props}/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get(['winner'])
  }
}

export const VotingContainer = connect(mapStateToProps)(Voting);