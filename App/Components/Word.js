import React, { Component } from 'react';
// import PropTypes from 'prop-types';;
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import xstyles from './Styles/WordStyle';
import { Colors } from '../Themes';

export default class Word extends Component {
  render() {
    const word = this.props.word;
    return (
      <TouchableOpacity style={styles.word} onPress={this.props.onPress}>
        <Icon 
          name='pencil'
          color={Colors.charcoal}
          size={this.props.fontSize}
          style={{ marginRight: 10, marginTop: 3 }}
        />
        <Text style={[styles.text, { fontSize: this.props.fontSize }]} >{word}</Text>
        <Icon 
          name='chevron-right'
          color={Colors.grey}
          size={14}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }
}

const styles = {
  ...xstyles,
  word: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 8.5,
    borderColor: Colors.steel,
    borderBottomWidth: 0.75
  },
  text: {
    flex: 1,
    fontSize: 16.5,
    textAlign: 'left'
  }
};

