import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import AppNavigation from '../Navigation/AppNavigation';
import { setTopLevelNavigator } from '../Services/NavigationService';
import { trackScreen } from '../Services/TrackingService';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';

// Styles
import styles from './Styles/RootContainerStyles';
import { Colors } from '../Themes';

class RootContainer extends Component {
  state = {
    backPress: false
  }

  componentDidMount() {
    if (!ReduxPersist.active) {
      this.props.startup();
    }

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.shouldCloseApp()) {
          BackHandler.exitApp();
          return false;
        }
        return true;
      });
    }
  }

  onNavigationStateChange = (prevState, currentState) => {
    trackScreen(prevState, currentState);
  }

  shouldCloseApp = () => {
    if (!this.state.backPress) {
      // Toast.showWithGravity('Apasati Back din nou pentru iesire', Toast.SHORT, Toast.CENTER);
      this.setState({ backPress: true });
      setTimeout(() => { this.setState({ backPress: false }); }, 1500);
      return false;
    }
    return true;
  }

  render() {
    const navigationPersistenceKey = (__DEV__ && false) ? 'NavigationStateDEV2' : null;
    return (
      <View style={[styles.applicationView, { backgroundColor: Colors.banner }]}>
        <StatusBar 
          animated
          barStyle='light-content'
          backgroundColor={Colors.primary}
        />
        <AppNavigation 
          persistenceKey={navigationPersistenceKey}
          ref={navigatorRef => setTopLevelNavigator(navigatorRef)}
          onNavigationStateChange={this.onNavigationStateChange} 
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  rehydrated: state.startup.rehydrated,
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
