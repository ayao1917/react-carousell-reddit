import React from 'react';
import Nav from './Nav';
import HomePage from './HomePage';
import TopicsPage from './TopicsPage';
import api from '../api'

export default class CarousellReddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Home',
      topics: [],
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleReloadTopicList = this.handleReloadTopicList.bind(this);
  }

  handleReloadTopicList() {
    this.setState({
      topics: api.getTopics()
    });
  }

  handlePageChange(page) {
    this.setState({
      page: page
    });
  }

  componentDidMount() {
    this.handleReloadTopicList();
  }

  render() {
    let currentPage;

    switch (this.state.page) {
      case 'Home':
        currentPage = <HomePage topics={this.state.topics}/>;
        break;

      case 'Topics':
        currentPage = <TopicsPage topics={this.state.topics} onUpdate={this.handleReloadTopicList}/>;
        break;

      default:
        currentPage = <HomePage/>;
    }

    return (
      <div>
        <Nav current={this.state.page} onPageChange={this.handlePageChange}/>
        { currentPage }
      </div>
    );
  }
}
