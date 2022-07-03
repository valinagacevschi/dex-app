import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SettingsActions from '../Redux/SettingsRedux';
import Header from '../Components/Header';
// Styles
import xstyles from './Styles/FontScreenStyle';

const fonts = [
  { name: 'Mic', size: 16 }, 
  { name: 'Mediu', size: 19 }, 
  { name: 'Mare', size: 22 }, 
];

class FontScreen extends Component {
  onPress = (font) => {
    this.props.setFont(font);
    this.props.navigation.goBack();
  }

  renderItem = ({ item, index }) => {
    const fontSize = 16 + index * 3;
    return (
      <TouchableOpacity style={styles.textBox} onPress={() => this.onPress(item)}>
        <Text style={{ flex: 1, fontSize }}>{item.name}</Text>
        <Icon
          name='chevron-right'
          color={'#999'}
          size={16}
          style={{ marginRight: 10, marginTop: 3 }}
        />        
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <Header title='Mărime Text' />
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={fonts}
          renderItem={this.renderItem}
          style={styles.white} 
        />
      </SafeAreaView>
    );
  }
}

const styles = {
  ...xstyles,
  textBox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderColor: '#999',
    borderBottomWidth: 0.75,
  },
  text: {
    fontSize: 16,
  }
};

const mapStateToProps = (state) => ({
  font: state.settings.font,
});

const mapDispatchToProps = (dispatch) => ({
  setFont: (font) => dispatch(SettingsActions.setFont(font))
});

export default connect(mapStateToProps, mapDispatchToProps)(FontScreen);
