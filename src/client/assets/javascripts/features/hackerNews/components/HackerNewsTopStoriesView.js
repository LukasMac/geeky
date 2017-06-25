import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as hackerNewsActions, selector } from '../';

import HackerNewsStory from './HackerNewsStory';
import HackerNewsTopStoriesError from './HackerNewsTopStoriesError';
import HackerNewsTopStoriesFetching from './HackerNewsTopStoriesFetching';

import './HackerNewsTopStories.scss';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(hackerNewsActions, dispatch)
}))
export default class HackerNewsTopStoriesView extends Component {
  componentDidMount() {
    if (!this.props.hackerNews.createdAt) {
      this.props.actions.requestHackerNewsTopStories();
    }
  }

  render() {
    if (this.props.hackerNews.error) {
      return <HackerNewsTopStoriesError data={this.props.hackerNews.data} />;
    } else if (this.props.hackerNews.fetching) {
      return <HackerNewsTopStoriesFetching />;
    }

    if (this.props.hackerNews.topStories) {
      return (
        <div className="hacker-news-top-stories">
          <div className="header">
            Hacker News <small>(refreshed every 10 minutes)</small>
          </div>
          {this.props.hackerNews.topStories.map((story) =>
          <HackerNewsStory key={story.id} story={story} />
          )}
        </div>
        );
    } else {
      return <div>Fetching Hacker News</div>;
    }
  }
}
