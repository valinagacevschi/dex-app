import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  wordsRequest: ['word'],
  wordsSuccess: ['payload'],
  wordsFailure: null,
  wordsReset: null,
});

export const WordsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true, payload: null });

// successful api lookup
export const success = (state, { payload }) => 
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const reset = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WORDS_REQUEST]: request,
  [Types.WORDS_SUCCESS]: success,
  [Types.WORDS_FAILURE]: failure,
  [Types.WORDS_RESET]: reset,
});
