import React, { Component } from 'react';
import { Provider } from 'react-redux';
import '../Config';
import DebugConfig from '../Config/DebugConfig';
import PushConfig from '../Config/PushConfig';
import RootContainer from './RootContainer';
import createStore from '../Redux';

// create our store
const store = createStore();

PushConfig.configure(store.dispatch);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App;
