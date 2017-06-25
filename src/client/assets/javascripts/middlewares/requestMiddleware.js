import api from '../lib/api/api';
import githubApi from '../lib/api/githubApi';
import momentumApi from '../lib/api/momentumApi';
import twitterApi from '../lib/api/twitterApi';
import hackerNewsApi from '../lib/api/hackerNewsApi';
import * as GithubEndpoints from '../lib/api/endpoints/github';
import * as TwitterEndpoints from '../lib/api/endpoints/twitter';
import * as BackgroundEndpoints from '../lib/api/endpoints/background';
import * as HackerNewsEndpoints from '../lib/api/endpoints/hackerNews';
import {
  requestActions as githubPullRequestsRequestActions,
  actionCreators as githubPullRequestActionCreators
} from '../features/githubPullRequests';
import {
  requestActions as backgroundRequestActions,
  actionCreators as backgroundActionCreators
} from '../features/background';
import {
  requestActions as twitterFeedRequestActions,
  actionCreators as twitterFeedActionCreators
} from '../features/twitterFeed';
import {
  requestActions as hackerNewsRequestActions,
  actionCreators as hackerNewsActionCreators,
} from '../features/hackerNews';

const actions = {
  ...githubPullRequestsRequestActions,
  ...backgroundRequestActions,
  ...twitterFeedRequestActions,
  ...hackerNewsRequestActions,
};

const apiRequestGitHubPullRequests = (store) => {
  const settings = store.getState().settings.persisted;
  GithubEndpoints.getPullRequests(githubApi.getInstance(settings.githubApiURL, settings.githubAccessToken), 123)
    .then(response => {
      store.dispatch(githubPullRequestActionCreators.requestGithubPullRequestsSuccess(response.body));
    }).catch(err => {
      store.dispatch(githubPullRequestActionCreators.requestGithubPullRequestsFailure(err));
    });
};

const apiRequestBackgroundsMetadata = (store, _id, filename) => {
  BackgroundEndpoints.getBackgroundsMetadata(momentumApi.getInstance(), 123)
    .then(response => {
      store.dispatch(backgroundActionCreators.requestBackgroundsMetadataSuccess(response.body));
    }).catch(err => {
      console.log(err);
      // store.dispatch(backgroundActionCreators.requestBackgroundMetadataError(err));
    });
};

const apiRequestBackgroundDownload = (store, _id, filename) => {
  BackgroundEndpoints.getBackground(api.getInstance(), filename)
    .then(response => {
      store.dispatch(backgroundActionCreators.requestBackgroundDownloadSuccess(_id, response.body));
    }).catch(err => {
      store.dispatch(backgroundActionCreators.requestBackgroundDownloadError(err));
    });
};

const apiRequestTwitterSearch = (store) => {
  const TWITTER_BEARER_TOKEN_KEY = 'twitterBearerToken';
  const settings = store.getState().settings.persisted;
  const searchTweets = (accessToken) => {
    TwitterEndpoints.twitterSearch(twitterApi.getInstance(accessToken), settings.twitterSearchKeywords)
    .then(response => {
      store.dispatch(twitterFeedActionCreators.requestTwitterSearchSuccess(response.body.statuses));
    }).catch(err => {
      store.dispatch(twitterFeedActionCreators.requestTwitterSearchError(err));
    });
  }

  const twitterBearerToken = localStorage.getItem(TWITTER_BEARER_TOKEN_KEY)
  if (twitterBearerToken) {
    searchTweets(twitterBearerToken);
  } else {
    twitterApi.getOAuthToken(
      settings.twitterConsumerKey, settings.twitterConsumerSecret
    ).then(authResponse => {
      localStorage.setItem(TWITTER_BEARER_TOKEN_KEY, authResponse.body.access_token);
      searchTweets(authResponse.body.access_token);
    }).catch(err => {
      store.dispatch(twitterFeedActionCreators.requestTwitterSearchError(err));
    });
  }
};

const apiRequestHackerNewsTopStories = (store) => {
  HackerNewsEndpoints.hackerNewsTopStories(hackerNewsApi.getInstance())
    .then(response => {
      store.dispatch(hackerNewsActionCreators.requestHackerNewsTopStoriesSuccess());
      apiRequestHackerNewsStory(store, response.body[0]);
      apiRequestHackerNewsStory(store, response.body[1]);
      apiRequestHackerNewsStory(store, response.body[2]);
    }).catch(err => {
      store.dispatch(hackerNewsActionCreators.requestHackerNewsTopStoriesFailure(err));
    });
};

const apiRequestHackerNewsStory = (store, id) => {
  HackerNewsEndpoints.hackerNewsStory(hackerNewsApi.getInstance(), id)
    .then(response => {
      store.dispatch(hackerNewsActionCreators.requestHackerNewsStorySuccess(response.body));
    }).catch(err => {
      store.dispatch(hackerNewsActionCreators.requestHackerNewsStoryFailure(err));
    });
}

export default (store) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    case actions.REQUEST_GITHUB_PULL_REQUESTS:
      apiRequestGitHubPullRequests(store);
      break;
    case actions.REQUEST_BACKGROUND_METADATA:
      apiRequestBackgroundsMetadata(store);
      break;
    case actions.REQUEST_BACKGROUND_DOWNLOAD:
      apiRequestBackgroundDownload(store, action._id, action.filename);
      break;
    case actions.REQUEST_TWITTER_SEARCH:
      apiRequestTwitterSearch(store);
      break;
    case actions.REQUEST_HACKER_NEWS_TOP_STORIES:
      apiRequestHackerNewsTopStories(store);
      break;
  }
}
