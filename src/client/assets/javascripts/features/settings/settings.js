import { createStructuredSelector } from 'reselect';

export const NAME = 'settings';

export const actions = {
  OPEN: 'redux-app/settings/OPEN',
  CLOSE: 'redux-app/settings/CLOSE',
  SAVE: 'redux-app/settings/SAVE',
};

const persistedSettings = JSON.parse(localStorage.getItem(NAME)) || {};
const initialState = { persisted: persistedSettings };

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case actions.OPEN:
      return {
        ...state,
        open: true,
      };
    case actions.CLOSE:
      return {
        ...state,
        open: false,
      };
    case actions.SAVE:
      localStorage.setItem(NAME, JSON.stringify(action.persistedSettings));

      return {
        ...state,
        persisted: action.persistedSettings,
      };
    default:
      return state;
  }
}

// Action creators
const click = () => ({
  type: actions.OPEN,
});

const close = () => ({
  type: actions.CLOSE,
});

const save = (persistedSettings) => ({
  type: actions.SAVE,
  persistedSettings
});

export const actionCreators ={
  click,
  close,
  save,
}

// Selectors
const settings = (state) => state[NAME];

export const selector = createStructuredSelector({
  settings,
});
