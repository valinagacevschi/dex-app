import * as React from 'react';
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';

createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav
);

const ReduxAppNavigator = reduxifyNavigator(AppNavigation, 'root');

class ReduxNavigation extends React.Component {
  render() {
    return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(ReduxNavigation);
