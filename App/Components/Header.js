import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import xstyles from './Styles/HeaderStyle';
import { Colors } from '../Themes';

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        {!this.props.noBack && 
        <TouchableHighlight style={styles.back} onPress={() => this.props.navigation.goBack()} >
          <Icon
            name='arrow-left'
            color={Colors.snow}
            size={24}
            style={styles.icon}
          />
        </TouchableHighlight>}
        {this.props.leftButton &&
          <TouchableHighlight style={styles.back} onPress={this.props.onLeftPress} >
            <Icon
            name={this.props.leftButton}
              color={Colors.snow}
              size={24}
              style={styles.icon}
            />
          </TouchableHighlight>}
        <Text style={[styles.title, this.props.rightButton && { paddingRight: 0 }]}>
          {this.props.title}
        </Text>
        {this.props.rightButton ? 
        <TouchableHighlight style={styles.back} onPress={this.props.onRightPress} >
          <Icon
            name={this.props.rightButton}
            color={Colors.snow}
            size={24}
            style={styles.icon}
          />
        </TouchableHighlight> : <View style={{ width: 50 }} />}
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.banner,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  back: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  title: {
    flex: 1,
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 50,
  }
};

export default withNavigation(Header);
