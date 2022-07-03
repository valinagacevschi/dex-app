import PushNotification from 'react-native-push-notification';
import NotificationActions from '../Redux/NotificationRedux';

export default {
  configure: (dispatch) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        if (__DEV__) console.log('TOKEN:', token);
        dispatch(NotificationActions.saveToken(token, true));
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        if (__DEV__) console.log('NOTIFICATION:', notification);
        dispatch(NotificationActions.addNotification(notification.message));
      },

      // ANDROID ONLY: (optional) GCM Sender ID.
      senderID: '461135635849',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: false,

      /**
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
  }
};
