import React from 'react';

export default class TopicModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleFormSubmit() {
    const topic = {
      content: this.state.content
    };

    if (this.props.topic) {
      topic.id = this.props.topic.id;
      topic.votes = this.props.topic.votes;
    }

    this.setState({
      content: '',
    });

    this.props.onSubmit(topic);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.topic) {
      this.setState({ content: nextProps.topic.content });
    }
  }

  render() {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="topicModalLabel"
           aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="topicModalLabel">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">Content:</label>
                  <textarea className="form-control" id="message-text" value={this.state.content} onChange={this.handleTextChange}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleFormSubmit}>{this.props.btn}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
