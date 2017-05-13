import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as twitterFeedActions, selector } from '../';

import TwitterFeed from './TwitterFeed';
import TwitterFeedError from './TwitterFeedError';
import TwitterFeedFetching from './TwitterFeedFetching';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(twitterFeedActions, dispatch)
}))
export default class TwitterFeedView extends Component {
  componentDidMount() {
    if (!this.props.twitterFeed.createdAt) {
      this.props.actions.requestTwitterSearch();
    }
  }

  render() {
    if (this.props.twitterFeed.error) {
      return <TwitterFeedError data={this.props.twitterFeed.data} />;
    } else if (this.props.twitterFeed.fetching) {
      return <TwitterFeedFetching />;
    }

    return <TwitterFeed twitterFeed={this.props.twitterFeed} />;
  }
}
