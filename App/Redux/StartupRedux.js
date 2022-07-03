import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
});

export const StartupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({ 
  rehydrated: false,
});

/* ------------- Reducers ------------- */

const startup = state => state.merge({ rehydrated: true });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
});
