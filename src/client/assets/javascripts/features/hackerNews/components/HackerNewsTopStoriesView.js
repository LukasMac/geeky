import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as hackerNewsActions, selector } from '../';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(hackerNewsActions, dispatch)
}))
export default class HackerNewsTopStoriesView extends Component {
  componentDidMount() {
    // if (!this.props.twitterFeed.createdAt) {
      this.props.actions.requestHackerNewsTopStories();
    // }
  }

  render() {
    // if (this.props.twitterFeed.error) {
    //   return <TwitterFeedError data={this.props.twitterFeed.data} />;
    // } else if (this.props.twitterFeed.fetching) {
    //   return <TwitterFeedFetching />;
    // }

    // return <TwitterFeed twitterFeed={this.props.twitterFeed} />;
    if (this.props.hackerNews.topStories) {
      return (
        <div>
          {this.props.hackerNews.topStories.map(function (story) {
          return (<div>{story.title}</div>);
          })}
        </div>
        );
    } else {
      return <div>Fetching Hacker News</div>;
    }
  }
}
