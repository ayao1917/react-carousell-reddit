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
    const filteredList = api.getTopics().sort((a, b) => {
      if (a.votes < b.votes)
        return 1;
      if (a.votes > b.votes)
        return -1;
      return 0;
    }).slice(0, 20);

    this.setState({
      topics: filteredList,
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
        currentPage = <HomePage topics={this.state.topics} onUpdate={this.handleReloadTopicList}/>;
        break;

      case 'Topics':
        currentPage = <TopicsPage topics={this.state.topics} onUpdate={this.handleReloadTopicList}/>;
        break;

      default:
        currentPage = <HomePage/>;
    }

    return (
      <div>
        <Nav current={this.state.page} onPageChange={this.handlePageChange} onUpdate={this.handleReloadTopicList}/>
        { currentPage }
      </div>
    );
  }
}
