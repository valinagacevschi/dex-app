import React from 'react';
import { storiesOf } from '@storybook/react-native';

import SearchBar from './SearchBar';

storiesOf('SearchBar')
  .add('Default', () => (
    <SearchBar
      placeholder='Search'
    />
  ))
  .add('autoFocus', () => (
    <SearchBar
      placeholder='Search'
      autoFocus
    />
  ))
  .add('autoCapitalize', () => (
    <SearchBar
      placeholder='Search'
      autoCapitalize
    />
  ))
  .add('handleSearch', () => (
    <SearchBar
      placeholder='Search'
      handleSearch={(input) => console.log('handleSearch press', input)}
    />
  ));
