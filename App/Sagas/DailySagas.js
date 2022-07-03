import { call, put } from 'redux-saga/effects';
import DailyActions from '../Redux/DailyRedux';
import { wordOf } from '../Transforms/Html';

export function* getDaily(api, action) {
  const { data } = action;
  const response = yield call(api.wordOfDay, data);
  try {
    yield put(DailyActions.dailySuccess(wordOf(response.data)));
  } catch (err) {
    yield put(DailyActions.dailyFailure());
  }  
}
