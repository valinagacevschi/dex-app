import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Header from './Header';

storiesOf('Header')
  .add('Default', () => (
    <Header
      title='HEADER TITLE'
    />
  ));
