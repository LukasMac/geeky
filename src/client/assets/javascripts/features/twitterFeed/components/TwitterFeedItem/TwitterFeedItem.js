import React, { Component, PropTypes } from 'react';

import './TwitterFeedItem.scss';

export default class TwitterFeedItem extends Component {
  static propTypes = {
    tweet: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="tweet">
        <div className="header">
          <img src={this.props.tweet.user.profile_image_url} className="profile-picture" />
          <b>{this.props.tweet.user.name}</b> <span className="screenName">@{this.props.tweet.user.screen_name}</span>
        </div>
        {this.props.tweet.text}
        <div className="text-right">
          <a
            href={`https://twitter.com/jsmckinney/status/${this.props.tweet.id_str}`}
            target="_blank"
            className="open-tweet-link"
          >Open tweet in new window</a>
      </div>
      </div>
    );
  }
}
