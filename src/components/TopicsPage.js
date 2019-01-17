import React from 'react';
import TopicModal from './TopicModal';
import api from '../api';

export default class TopicsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null
    };

    this.handleEditModalShow = this.handleEditModalShow.bind(this);
    this.handleTopicUpdate = this.handleTopicUpdate.bind(this);
    this.handleTopicsDelete = this.handleTopicsDelete.bind(this);
  }

  handleEditModalShow(topic) {
    this.setState({
      target: topic
    });
  }

  handleTopicUpdate(data) {
    api.setTopic(data);
    this.props.onUpdate();
  }

  handleTopicsDelete(id) {
    if (window.confirm('Sure to delete topic?')) {
      api.removeTopic(id);
      this.props.onUpdate();
    }
  }

  render() {
    const topicTableBody = this.props.topics.map((topic) => {
      return (
        <tr key={topic.id}>
          <td>{topic.content}</td>
          <td>{topic.votes}</td>
          <td>
            <button type="button" className="btn btn-secondary btn-sm mr-1" data-toggle="modal" data-target="#editTopicModal" onClick={() => {this.handleEditModalShow(topic)}}>Edit</button>
            <button type="button" className="btn btn-danger btn-sm" onClick={() => {this.handleTopicsDelete(topic.id)}}>Delete</button>
          </td>
        </tr>
      );
    });

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col col-10">
            <h3>Topic Management</h3>
          </div>
          {
            this.props.topics.length > 0 && (
              <div className="col">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addTopicModal">ADD</button>
              </div>
            )
          }
        </div>
        {
          this.props.topics.length > 0 ? (
            <table className="table table-striped">
              <thead>
              <tr>
                <th scope="col">Content</th>
                <th scope="col">Votes</th>
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              {topicTableBody}
              </tbody>
            </table>
          ) : (
            <div className="jumbotron">
              <h1 className="display-4">No Topics Found</h1>
              <p>Click here to add one</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addTopicModal">ADD</button>
            </div>
          )
        }
        <TopicModal id="addTopicModal" title="Add Topic" btn="Add" onSubmit={this.handleTopicUpdate}/>
        <TopicModal id="editTopicModal" title="Update Topic" btn="Update" topic={this.state.target} onSubmit={this.handleTopicUpdate}/>
      </div>
    );
  }
}
