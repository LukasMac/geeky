import { createStructuredSelector } from 'reselect';

export const NAME = 'background';
export const CACHE_KEY = 'backgroundCacheKey';

export const requestActions = {
  REQUEST_BACKGROUND_METADATA: 'redux-app/background/REQUEST_BACKGROUND_METADATA',
  REQUEST_BACKGROUND_METADATA_SUCCESS: 'redux-app/background/REQUEST_BACKGROUND_METADATA_SUCCESS',
  REQUEST_BACKGROUND_METADATA_ERROR: 'redux-app/background/REQUEST_BACKGROUND_METADATA_ERROR',
  REQUEST_BACKGROUND_DOWNLOAD: 'redux-app/background/REQUEST_BACKGROUND_DOWNLOAD',
  REQUEST_BACKGROUND_DOWNLOAD_SUCCESS: 'redux-app/background/REQUEST_BACKGROUND_DOWNLOAD_SUCCESS',
  REQUEST_BACKGROUND_DOWNLOAD_ERROR: 'redux-app/background/REQUEST_BACKGROUND_DOWNLOAD_ERROR',
}

const initialState = (localStorage.getItem(CACHE_KEY) === new Date().getDate().toString()) ?
  JSON.parse(localStorage.getItem(NAME)) : [];

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case requestActions.REQUEST_BACKGROUND_METADATA_SUCCESS:
      localStorage.setItem(NAME, JSON.stringify(action.data));
      return action.data;
    default:
      return state;
  }
}

// Action creators
const requestBackgroundsMetadata = () => ({
  type: requestActions.REQUEST_BACKGROUND_METADATA,
});
const requestBackgroundsMetadataSuccess = (data) => ({
  type: requestActions.REQUEST_BACKGROUND_METADATA_SUCCESS,
  data
});
const requestBackgroundsMetadataError = () => ({
  type: requestActions.REQUEST_BACKGROUND_METADATA_ERROR,
});
const requestBackgroundDownload = (_id, filename) => ({
  type: requestActions.REQUEST_BACKGROUND_DOWNLOAD,
  _id,
  filename
});
const requestBackgroundDownloadSuccess = (_id, data) => ({
  type: requestActions.REQUEST_BACKGROUND_DOWNLOAD_SUCCESS,
  _id,
  data
});
const requestBackgroundDownloadError = () => ({
  type: requestActions.REQUEST_BACKGROUND_DOWNLOAD_ERROR,
});

export const actionCreators = {
  requestBackgroundsMetadata,
  requestBackgroundsMetadataSuccess,
  requestBackgroundsMetadataError,
  requestBackgroundDownload,
  requestBackgroundDownloadSuccess,
  requestBackgroundDownloadError,
};

// Selectors
const background = (state) => state[NAME];

export const selector = createStructuredSelector({
  background
});
