import { createStructuredSelector } from 'reselect';

export const NAME = 'twitterFeed';
export const CACHE_KEY = 'twitterFeedCacheKey';

export const requestActions = {
  REQUEST_TWITTER_SEARCH: 'redux-app/twitterSearch/REQUEST_TWITTER_SEARCH',
  REQUEST_TWITTER_SEARCH_SUCCESS: 'redux-app/twitterSearch/REQUEST_TWITTER_SEARCH_SUCCESS',
  REQUEST_TWITTER_SEARCH_ERROR: 'redux-app/twitterSearch/REQUEST_TWITTER_SEARCH_ERROR',
}

let initialState = { statuses: [] };
const cachedState = JSON.parse(localStorage.getItem(NAME)) || {};
const ONE_MINUTE = 60;
const lastFetchedAgo = Math.floor(Date.now() / 1000) - (cachedState.createdAt || 0);
if (lastFetchedAgo < ONE_MINUTE) {
  initialState = cachedState;
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case requestActions.REQUEST_TWITTER_SEARCH:
      return {
        ...state,
        fetching: true,
      }
    case requestActions.REQUEST_TWITTER_SEARCH_SUCCESS:
      const newState = {
        ...state,
        createdAt: Math.floor(Date.now() / 1000),
        statuses: action.data,
        fetching: false,
      }

      localStorage.setItem(NAME, JSON.stringify(newState));
      return newState;
    case requestActions.REQUEST_TWITTER_SEARCH_ERROR:
      return {
        ...state,
        error: true,
        data: action.data,
        fetching: false,
      }
    default:
      return state;
  }
}

// Action creators
const requestTwitterSearch = () => ({
  type: requestActions.REQUEST_TWITTER_SEARCH,
});
const requestTwitterSearchSuccess = (data) => ({
  type: requestActions.REQUEST_TWITTER_SEARCH_SUCCESS,
  data
});
const requestTwitterSearchError = (data) => ({
  type: requestActions.REQUEST_TWITTER_SEARCH_ERROR,
  data
});

export const actionCreators = {
  requestTwitterSearch,
  requestTwitterSearchSuccess,
  requestTwitterSearchError,
};

// Selectors
const twitterFeed = (state) => state[NAME];

export const selector = createStructuredSelector({
  twitterFeed
});
