import React, { Component, PropTypes } from 'react';

import TwitterFeedItem from '../TwitterFeedItem';

import './TwitterFeed.scss';

export default class TwitterFeed extends Component {
  static propTypes = {
    twitterFeed: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="scrollable">
        {this.props.twitterFeed.statuses.map(tweet =>
          <TwitterFeedItem key={tweet.id} tweet={tweet} />
        )}
      </div>
    );
  }
}
