import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './App';
import FriendsView from 'features/friends/components/FriendsView';
import GithubPullRequestsView from 'features/githubPullRequests/components/GithubPullRequestsView';
import NotFoundView from 'components/NotFound';

export default (
  <GithubPullRequestsView />
);
