import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveToken: ['token', 'notify'],
  addNotification: ['message'],
  clearNotifications: null,
  notificationSuccess: null,
  notificationFailure: null,
});

export const NotificationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  notifications: [],
  token: null,
  fetching: false,
});

/* ------------- Selectors ------------- */

export const NotificationSelectors = {
  getToken: state => state.token
};

/* ------------- Reducers ------------- */
const addNotification = (state = INITIAL_STATE, { message }) =>
  state.merge({ notifications: [message, ...state.notifications] });

const clearNotifications = (state) =>
  state.merge({ notifications: [] });

const saveToken = (state, { token }) =>
  state.merge({ token });

// successful avatar lookup
export const success = (state) => 
  state.merge({ fetching: false, error: null });

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_TOKEN]: saveToken,
  [Types.ADD_NOTIFICATION]: addNotification,
  [Types.CLEAR_NOTIFICATIONS]: clearNotifications,
  [Types.NOTIFICATION_SUCCESS]: success,
  [Types.NOTIFICATION_FAILURE]: failure,
});
