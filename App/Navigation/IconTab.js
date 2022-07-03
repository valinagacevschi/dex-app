import React from 'react';
import { Platform } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class IconTab extends React.Component {
  render() {
    const { tintColor, focused, size } = this.props.focus;
    return (
        <Icon
          name={this.props.name || 'ellipsis-h'}
          color={tintColor}
          size={size ? size : (focused ? 28 : 22)}
          style={{ marginTop: Platform.OS === 'ios' ? 3 : 0 }} 
        />
    );
  }
}

export const icon = (iconName, focus) => (<IconTab name={iconName} focus={focus} />);
