import React from 'react';

class Vote extends React.Component {
  constructor(props){
    super(props);
  }
  getPair() {
    return this.props.pair || [];
  }
  isDisabled() {
    return !!this.props.hasVoted;
  }
  hasVotedFor(item){
    return this.props.hasVoted === item;
  }
  render() {
    return (
      <div className="voting">
        {this.getPair().map(item => 
          <button key = {item} disabled={this.isDisabled()}
          onClick={() => this.props.vote(item)}>
            <h1>{item}</h1>
            {this.hasVotedFor(item) ? <div className="label">Voted</div> : null}
          </button>
        )}
      </div>
    )
  }
}

export default Vote;