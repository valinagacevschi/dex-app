import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Word from './Word';

storiesOf('Word')
  .add('Default', () => (
    <Word
      item={{ word: 'some word' }}
    />
  ))
  .add('OnPress', () => (
    <Word
      item={{ word: 'some word' }}
      onPress={() => console.log('word press')}
    />
  ));
