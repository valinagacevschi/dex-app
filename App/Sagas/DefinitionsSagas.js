import { call, put } from 'redux-saga/effects';
import DefinitionsActions from '../Redux/DefinitionsRedux';
import format from '../Transforms/Definitions';

export function* getDefinitions(api, action) {
  const { word } = action;
  // make the call to the api
  const response = yield call(api.getDefinition, word);
  // success?
  if (response.ok) {
    yield put(DefinitionsActions.definitionsSuccess(format(response.data)));
  } else {
    __DEV__ && console.log('error', response);
    yield put(DefinitionsActions.definitionsFailure());
  }
}
