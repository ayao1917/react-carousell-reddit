import React from 'react';
import TopicCard from './TopicCard';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.onUpdate();
  }

  render() {
    const topicLayout = this.props.topics.map((topic) => {
      return (
        <div className="col col-lg-4" key={topic.id}>
          <TopicCard topic={topic} onUpdate={this.handleUpdate}/>
        </div>
      );
    });
    return (
      <div className="container mt-3">
        {this.props.topics.length > 0 ? (
          <div className="row">
            {topicLayout}
          </div>
        ) : (
          <div className="jumbotron">
            <h1 className="display-4">No Topics Found</h1>
          </div>
        )}
      </div>
    );
  }
}
