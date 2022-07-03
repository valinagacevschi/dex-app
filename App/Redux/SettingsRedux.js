import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setFont: ['font'],
  setKeyboard: ['showKeyboard'],
  setNotify: ['notify'],
  reset: null,
});

export const SettingsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  font: { name: 'Mic', size: 16 },
  showKeyboard: true,
  notify: true,
});

/* ------------- Reducers ------------- */

// request the data from an api
const setFont = (state, { font }) => state.merge({ font });
const setKeyboard = (state, { showKeyboard }) => state.merge({ showKeyboard });
const setNotify = (state, { notify }) => state.merge({ notify });
const reset = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FONT]: setFont,
  [Types.SET_KEYBOARD]: setKeyboard,
  [Types.SET_NOTIFY]: setNotify,
  [Types.RESET]: reset,
});
