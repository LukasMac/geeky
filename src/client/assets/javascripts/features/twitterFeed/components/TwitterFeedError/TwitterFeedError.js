import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

export default class TwitterFeedError extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Alert bsStyle="danger">Can not fetch twitter feed: {this.props.data.message}</Alert>
    );
  }
}
