import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

export default class HackerNewsTopStoriesError extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Alert bsStyle="danger">Can not fetch Hacker News top stories: {this.props.data.message}</Alert>
    );
  }
}
