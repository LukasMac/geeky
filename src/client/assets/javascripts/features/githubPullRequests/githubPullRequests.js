import { createStructuredSelector } from 'reselect';
import { NAME as settingsName } from '../settings';

export const NAME = 'githubPullRequests';

export const requestActions = {
  REQUEST_GITHUB_PULL_REQUESTS: 'redux-app/githubPullRequests/REQUEST_GITHUB_PULL_REQUESTS',
  REQUEST_GITHUB_PULL_REQUESTS_SUCCESS: 'redux-app/githubPullRequests/REQUEST_GITHUB_PULL_REQUESTS_SUCCESS',
  REQUEST_GITHUB_PULL_REQUESTS_ERROR: 'redux-app/githubPullRequests/REQUEST_GITHUB_PULL_REQUESTS_ERROR',
}

const initialState = []

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case requestActions.REQUEST_GITHUB_PULL_REQUESTS_SUCCESS:
      return action.data;
    case requestActions.REQUEST_GITHUB_PULL_REQUESTS_ERROR:
      return {
        error: true,
        data: action.err,
      };
    default:
      return state;
  }
}

// Action creators
const requestGithubPullRequests = () => ({
  type: requestActions.REQUEST_GITHUB_PULL_REQUESTS,
});
const requestGithubPullRequestsSuccess = (data) => ({
  type: requestActions.REQUEST_GITHUB_PULL_REQUESTS_SUCCESS,
  data
});
const requestGithubPullRequestsFailure = (err) => ({
  type: requestActions.REQUEST_GITHUB_PULL_REQUESTS_ERROR,
  err
});

export const actionCreators = {
  requestGithubPullRequests,
  requestGithubPullRequestsSuccess,
  requestGithubPullRequestsFailure,
};

// Selectors
const githubPullRequests = (state) => state[NAME];
const settings = (state) => state[settingsName];

export const selector = createStructuredSelector({
  [NAME]: githubPullRequests,
  [settingsName]: settings,
});

