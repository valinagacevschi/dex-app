import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';
import MAPI from '../Services/Mapi';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { WordsTypes } from '../Redux/WordsRedux';
import { DailyTypes } from '../Redux/DailyRedux';
import { DefinitionsTypes } from '../Redux/DefinitionsRedux';
import { NotificationTypes } from '../Redux/NotificationRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { getWords } from './WordsSagas';
import { getDaily } from './DailySagas';
import { getDefinitions } from './DefinitionsSagas';
import { saveToken, addNotification } from './NotificationSagas';

// import { getDefaultSettings } from 'http2';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
const mapi = MAPI.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(NotificationTypes.ADD_NOTIFICATION, addNotification),

    // some sagas receive extra parameters in addition to an action
    takeLatest(NotificationTypes.SAVE_TOKEN, saveToken, mapi),

    takeLatest(DailyTypes.DAILY_REQUEST, getDaily, api),    
    takeLatest(WordsTypes.WORDS_REQUEST, getWords, api),
    takeLatest(DefinitionsTypes.DEFINITIONS_REQUEST, getDefinitions, api),
  ]);
}
