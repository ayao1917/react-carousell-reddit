import React from 'react';
import api from '../api';

export default class TopicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
    };

    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  handleVoteClick(vote) {
    const total = this.state.votes + vote;
    this.setState({
      votes: total
    });
    const target = {
      id: this.props.topic.id,
      content: this.props.topic.content,
      votes: total,
    };
    api.setTopic(target);
  }

  componentDidMount() {
    this.setState({ votes: this.props.topic.votes });
  }

  render() {
    return (
      <div className="card mb-2">
        <div className="card-body">
          <p className="card-text">
            {this.props.topic.content}
          </p>
          <button type="button" className="btn btn-danger down-vote mr-1" onClick={() => {this.handleVoteClick(-1)}}>-</button>
          <span className="topic-votes mr-1">{this.state.votes}</span>
          <button type="button" className="btn btn-success up-vote" onClick={() => {this.handleVoteClick(1)}}>+</button>
        </div>
      </div>
    );
  }
}
