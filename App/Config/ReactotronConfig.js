import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import Config from '../Config/DebugConfig';

if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({ name: 'DexApp' })
    .useReactNative()
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron;

  const oldConsoleLog = console.log;
  // make a new one
  console.log = (...args) => {
    // always call the old one, because React Native does magic swizzling too
    oldConsoleLog(...args);

    // send this off to Reactotron.
    Reactotron.display({
      name: 'LOG',
      value: args,
      preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
    });
  };
}
