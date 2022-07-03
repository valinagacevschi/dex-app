import { call, put } from 'redux-saga/effects';
import WordsActions from '../Redux/WordsRedux';
import format from '../Transforms/Html';

export function* getWords(api, action) {
  const { word } = action;
  // make the call to the api
  const response = yield call(api.getWords, word);
  try {
    yield put(WordsActions.wordsSuccess(format(response.data)));
  } catch (err) {
    __DEV__ && console.log('Error', err);
    yield put(WordsActions.wordsFailure());
  }
}
