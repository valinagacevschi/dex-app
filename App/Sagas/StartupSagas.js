import { put } from 'redux-saga/effects';
// import { is } from 'ramda';
import DailyActions from '../Redux/DailyRedux';

// process STARTUP actions
export function* startup() {
  const date = new Date().toISOString();
  const day = date.slice(0, 10).replace(/-/g, '/');
  yield put(DailyActions.dailyRequest(day));
}
