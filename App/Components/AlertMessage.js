import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/AlertMessageStyles';

export default class AlertMessage extends Component {
  static defaultProps = { show: true }

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool
  }

  render() {
    if (this.props.show) {
      const { title } = this.props;
      return (
        <View style={[styles.container, this.props.style]}>
          <View style={styles.contentContainer}>
            <Icon name={'exclamation-circle'} style={styles.icon} size={32} />
            <Text allowFontScaling={false} style={styles.message}>{title && title.toUpperCase()}</Text>
          </View>
        </View>
      );
    }
    return null;
  }
}
