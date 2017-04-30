import api from '../lib/api/api';
import githubApi from '../lib/api/githubApi';
import momentumApi from '../lib/api/momentumApi';
import * as GithubEndpoints from '../lib/api/endpoints/github';
import * as BackgroundEndpoints from '../lib/api/endpoints/background';
import { requestActions as githubPullRequestsRequestActions, actionCreators as githubPullRequestActionCreators } from '../features/githubPullRequests'
import { requestActions as backgroundRequestActions, actionCreators as backgroundActionCreators } from '../features/background'

const actions = {
  ...githubPullRequestsRequestActions,
  ...backgroundRequestActions,
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

   //       "_id":"150691d4-9160-4ffa-85bb-e33cc5972b58",
   //       "title":"Quepos, Costa Rica",
   //       "source":"kansasphoto",
   //       "attribution":"Photo by kansasphoto",
   //       "sourceUrl":"https://www.flickr.com/photos/34022876@N06/3486842841/",
   //       "filename":"https://farm4.staticflickr.com/3315/3486842841_d78a545ff2_o.jpg",
   //       "flt":false,
   //       "forDate":"2017-04-13",
   //       "detail_url":null,
   //       "is_favorite":false
   //    },
   //    {  
   //       "_id":"c3c40734-4bba-4242-8e8e-92162143f7fa",
   //       "title":"Three Brothers, Yosemite",
   //       "source":"Orrin Hancock",
   //       "attribution":"Photo by Orrin Hancock",
   //       "sourceUrl":"https://www.instagram.com/p/BA0dqO-zFQP/?taken-by=orrinhancock",
   //       "filename":"https://farm4.staticflickr.com/3946/33806116732_d175cc2577_k.jpg",
   //       "flt":false,
   //       "forDate":"2017-04-14",
   //       "detail_url":null,
   //       "is_favorite":false
   //    }
   // ]

  // store.dispatch(backgroundActionCreators.requestBackgroundsMetadataSuccess(response));
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
      debugger
      store.dispatch(backgroundActionCreators.requestBackgroundDownloadSuccess(_id, response.body));
    }).catch(err => {
      store.dispatch(backgroundActionCreators.requestBackgroundDownloadError(err));
    });
};


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
  }

}
