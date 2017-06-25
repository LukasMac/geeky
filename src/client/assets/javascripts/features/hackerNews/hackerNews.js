import { createStructuredSelector } from 'reselect';

export const NAME = 'hackerNews';
export const CACHE_KEY = 'hackerNewsCacheKey';

export const requestActions = {
  REQUEST_HACKER_NEWS_TOP_STORIES: 'redux-app/hackerNews/REQUEST_HACKER_NEWS_TOP_STORIES',
  REQUEST_HACKER_NEWS_TOP_STORIES_SUCCESS: 'redux-app/hackerNews/REQUEST_HACKER_NEWS_TOP_STORIES_SUCCESS',
  REQUEST_HACKER_NEWS_TOP_STORIES_FAILURE: 'redux-app/hackerNews/REQUEST_HACKER_NEWS_TOP_STORIES_FAILURE',
  REQUEST_HACKER_NEWS_STORY: 'redux-app/hackerNews/REQUEST_HACKER_NEWS_STORY',
  REQUEST_HACKER_NEWS_STORY_SUCCESS: 'redux-app/hackerNews/REQUEST_HACKER_NEWS_STORY_SUCCESS',
  REQUEST_HACKER_NEWS_STORY_FAILURE: 'redux-app/hackerNews/REQUEST_HACKER_NEWS_STORY_FAILURE',
}

let initialState = { topStories: [] };
const cachedState = JSON.parse(localStorage.getItem(NAME)) || {};
const TEN_MINUTES = 60 * 10;
const lastFetchedAgo = Math.floor(Date.now() / 1000) - (cachedState.createdAt || 0);
if (lastFetchedAgo < TEN_MINUTES) {
  initialState = cachedState;
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case requestActions.REQUEST_HACKER_NEWS_TOP_STORIES:
      return {
        ...state,
        fetching: true,
      }
    case requestActions.REQUEST_HACKER_NEWS_TOP_STORIES_SUCCESS:
      return {
        ...state,
        createdAt: Math.floor(Date.now() / 1000),
        topStories: [],
        fetching: false,
      }
    case requestActions.REQUEST_HACKER_NEWS_TOP_STORIES_FAILURE:
      return {
        error: true,
        data: action.data,
      }
    case requestActions.REQUEST_HACKER_NEWS_STORY_SUCCESS:
      const topStories = [...state.topStories, action.data];

      const newState = {
        ...state,
        topStories,
      }

      localStorage.setItem(NAME, JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}

// Action creators
const requestHackerNewsTopStories = () => ({
  type: requestActions.REQUEST_HACKER_NEWS_TOP_STORIES,
});
const requestHackerNewsTopStoriesSuccess = () => ({
  type: requestActions.REQUEST_HACKER_NEWS_TOP_STORIES_SUCCESS,
});
const requestHackerNewsTopStoriesFailure = (data) => ({
  type: requestActions.REQUEST_HACKER_NEWS_TOP_STORIES_FAILURE,
  data
});
const requestHackerNewsStory = (id) => ({
  type: requestActions.REQUEST_HACKER_NEWS_STORY,
  id
});
const requestHackerNewsStorySuccess = (data) => ({
  type: requestActions.REQUEST_HACKER_NEWS_STORY_SUCCESS,
  data
});
const requestHackerNewsStoryFailure = (data) => ({
  type: requestActions.REQUEST_HACKER_NEWS_STORY_FAILURE,
  data
});

export const actionCreators = {
  requestHackerNewsTopStories,
  requestHackerNewsTopStoriesSuccess,
  requestHackerNewsTopStoriesFailure,
  requestHackerNewsStory,
  requestHackerNewsStorySuccess,
  requestHackerNewsStoryFailure,
};

// Selectors
const hackerNews = (state) => state[NAME];

export const selector = createStructuredSelector({
  hackerNews
});
