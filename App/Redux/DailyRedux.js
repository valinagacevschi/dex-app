import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dailyRequest: ['data'],
  dailySuccess: ['wordOfDay'],
  dailyFailure: null
});

export const DailyTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  wordOfDay: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true });

// successful api lookup
export const success = (state, { wordOfDay }) =>
  state.merge({ fetching: false, error: null, wordOfDay });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DAILY_REQUEST]: request,
  [Types.DAILY_SUCCESS]: success,
  [Types.DAILY_FAILURE]: failure
});
