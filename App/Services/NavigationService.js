import { NavigationActions } from 'react-navigation';

let navigator;

export const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
