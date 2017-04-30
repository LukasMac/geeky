import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import friends, { NAME as friendsName } from 'features/friends';
import githubPullRequests, { NAME as githubPullRequestsName } from 'features/githubPullRequests';
import background, { NAME as backgroundName } from 'features/background';
import settings, { NAME as settingsName } from 'features/settings';


export default combineReducers({
  routing,
  [githubPullRequestsName]: githubPullRequests,
  [backgroundName]: background,
  [settingsName]: settings,
});
