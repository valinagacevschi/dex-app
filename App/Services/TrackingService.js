import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const GA_TRACKING_ID = 'UA-109658921-1';
const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);

export const trackScreen = (prevState, currentState) => {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);

  if (prevScreen !== currentScreen) {
    tracker.trackScreenView(currentScreen);
  }
};

const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};


export default {
  trackScreen,
  getActiveRouteName,
};
