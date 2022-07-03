import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import AboutScreen from '../Containers/AboutScreen';
import FontScreen from '../Containers/FontScreen';
import SettingsScreen from '../Containers/SettingsScreen';
import HistoryScreen from '../Containers/HistoryScreen';
import DefinitionScreen from '../Containers/DefinitionScreen';
import LaunchScreen from '../Containers/LaunchScreen';
import { icon } from './IconTab';
// import styles from './Styles/NavigationStyles';
import { Colors, Metrics } from '../Themes';

const SearchStack = createStackNavigator({
  search: { screen: LaunchScreen },
  definition: { screen: DefinitionScreen },
}, {
  headerMode: 'none',
});

const HistoryStack = createStackNavigator({
  history: { screen: HistoryScreen },
  definition: { screen: DefinitionScreen },
}, {
  headerMode: 'none',
});

const SettingsStack = createStackNavigator({
  settings: { screen: SettingsScreen },
  about: { screen: AboutScreen },
  fonts: { screen: FontScreen },
}, {
  headerMode: 'none',
});


const PrimaryNav = createBottomTabNavigator({
  search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarIcon: (focus) => icon('search', focus),
    },
  },
  history: {
    screen: HistoryStack,
    navigationOptions: {
      tabBarIcon: (focus) => icon('history', focus),
    },
  },
  settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarIcon: (focus) => icon('sliders', focus),
    },
  },
}, {
    initialRouteName: 'search',
    headerMode: 'none',
    animationEnabled: true, 
    lazy: false,
    scrollEnabled: false,
    swipeEnabled: false,
    backBehavior: 'search',
    tabBarOptions: {
      allowFontScaling: false,
      activeTintColor: Colors.snow,
      inactiveTintColor: Colors.steel,
      activeBackgroundColor: Colors.snow,
      showLabel: false,
      showIcon: true,
      upperCaseLabel: false,
      scrollEnabled: false,
      indicatorStyle: {
        borderBottomColor: Colors.snow,
        borderBottomWidth: 2
      },
      tabStyle: {
        backgroundColor: Colors.banner,
        // height: Metrics.tabBarHeight,
        padding: 0,
        margin: 0,
      },
      labelStyle: {
        margin: 0,
      },
      style: {
        backgroundColor: Colors.banner,
        // shadowColor: 'rgba(100,100,100, 1)',
        // shadowOffset: { height: -2, width: 0 },
        // shadowOpacity: 0.2,
        marginVertical: 5,
      },
      iconStyle: {
        width: Metrics.screenWidth / 5,
      },
    },
  }
);

// Manifest of possible screens
// const PrimaryNav = createStackNavigator({
//   LaunchScreen: { screen: LaunchScreen }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'LaunchScreen',
//   navigationOptions: {
//     headerStyle: styles.header
//   }
// });

export default createAppContainer(PrimaryNav);
