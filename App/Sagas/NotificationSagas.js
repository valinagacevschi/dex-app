import { call, put } from 'redux-saga/effects';
import DeviceInfo from 'react-native-device-info';
import NotificationActions from '../Redux/NotificationRedux';
import { navigate } from '../Services/NavigationService';
// import { NotificationSelectors } from '../Redux/NotificationRedux'

export function* saveToken(api, { token, notify }) {
  const deviceId = DeviceInfo.getUniqueID();
  const response = yield call(api.saveToken, token, notify, deviceId);
  if (response.ok) {
    yield put(NotificationActions.notificationSuccess(response.data));
  } else {
    yield put(NotificationActions.notificationFailure());
  }
}

export function* addNotification({ message }) {
  // maybe jump to messages screen
  navigate('search');
  yield put(NotificationActions.notificationSuccess(message));
}

export function* getNotification(api, action) {
  const { data } = action;
  const response = yield call(api.getnotification, data);

  if (response.ok) {
    yield put(NotificationActions.notificationSuccess(response.data));
  } else {
    yield put(NotificationActions.notificationFailure());
  }
}
