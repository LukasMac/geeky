import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { actionCreators as githubPullRequestsActions, selector } from '../';

import './GithubPullRequestsView.scss';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(githubPullRequestsActions, dispatch)
}))
export default class GithubPullRequestsView extends Component {
  constructor() {
    super();
    this.renderPullRequests = this.renderPullRequests.bind(this);
  }

  componentDidMount() {
    this.props.actions.requestGithubPullRequests();
  }

  renderPullRequests() {
    if (!this.props.githubPullRequests) {
      return false;
    }

    return this.props.githubPullRequests.map((pullRequest, index) => {
      return (
        <ListGroupItem key={index}>
          <a href={pullRequest.html_url} className="pr-title">{pullRequest.title}</a>
          <div className="opened-by">#{pullRequest.number} opened {moment(pullRequest.created_at).fromNow()} by {pullRequest.user.login}</div>
        </ListGroupItem>);
    });
  }

  render() {
    return (
      <div>
        <Panel header="Pull requests">
          {this.props.githubPullRequests.error ?
            <Alert bsStyle="danger">{this.props.githubPullRequests.data.message}</Alert> :
            <ListGroup fill>
              {this.renderPullRequests()}
            </ListGroup>
          }
        </Panel>
      </div>
    );
  }
}
