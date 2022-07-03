import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  historyAdd: ['word'],
  historyDelete: ['index'],
  historyReset: null,
});

export const HistoryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: [],
});

/* ------------- Reducers ------------- */

// request the word from an api
export const add = (state, { word }) => {
  const payload = [word, ...state.payload];
  return state.merge({ payload });
};

// successful api lookup
export const erase = (state, { index }) => {
  const payload = [...state.payload];
  payload.splice(index, 1);
  return state.merge({ payload });
};

export const reset = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HISTORY_ADD]: add,
  [Types.HISTORY_DELETE]: erase,
  [Types.HISTORY_RESET]: reset,
});
