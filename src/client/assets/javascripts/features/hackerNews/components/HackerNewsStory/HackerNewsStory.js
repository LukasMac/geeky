import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import './HackerNewsStory.scss';

export default class HackerNewsStory extends Component {
  static propTypes = {
    story: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="hacker-news-story">
        <div className="story-header">
          <a href={this.props.story.url} target="_blank">{this.props.story.title}</a>
        </div>
        <div className="subtext">
          {this.props.story.score} points by {this.props.story.by} {moment(this.props.story.time*1000).fromNow()} | <a href={`https://news.ycombinator.com/item?id=${this.props.story.id}`} target="_blank">{this.props.story.descendants} comments</a>
        </div>
      </div>
    );
  }
}
