import React, { Component } from 'react';
// import PropTypes from 'prop-types';;
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import xstyles from './Styles/TermStyle';
import { Colors } from '../Themes';

export default class Term extends Component {
  render() {
    const { word, date } = this.props.item;
    return (
      <TouchableOpacity style={styles.word} onPress={this.props.onPress}>
        {this.props.delete && <TouchableOpacity onPress={this.props.onPressDelete}>
          <Icon
            name='minus-circle'
            color={Colors.fire}
            size={16}
            style={{ marginRight: 10, marginTop: 3 }}
          />
        </TouchableOpacity>}
        <Text style={[styles.text, { fontSize: this.props.fontSize }]} >{word}</Text>
        <Text style={[styles.date, { fontSize: this.props.fontSize - 2 }]} >{date}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: Colors.steel,
    borderBottomWidth: 0.75
  },
  text: {
    flex: 1,
    fontSize: 16.5,
    textAlign: 'left'
  },
  date: {
    color: Colors.grey
  }
};
