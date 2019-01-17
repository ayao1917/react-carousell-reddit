import React from 'react';

export default class TopicCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  handleVoteClick(vote, topic) {}

  render() {
    return (
      <div className="card mb-2">
        <div className="card-body">
          <p className="card-text">
            {this.props.topic.content}
          </p>
          <button type="button" className="btn btn-danger down-vote mr-1" onClick={this.handleVoteClick(-1, this.props.topic.id)}>-</button>
          <span className="topic-votes mr-1">{this.props.topic.votes}</span>
          <button type="button" className="btn btn-success up-vote" onClick={this.handleVoteClick(1, this.props.topic.id)}>+</button>
        </div>
      </div>
    );
  }
}
