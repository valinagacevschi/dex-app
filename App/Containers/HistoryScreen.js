import React, { Component } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import HistoryActions from '../Redux/HistoryRedux';
import Header from '../Components/Header';
import Term from '../Components/Term';
// Styles
import styles from './Styles/HistoryScreenStyle';

class HistoryScreen extends Component {
  state = {
    editing: false
  }

  onPressReset = () => {
    Alert.alert(
      'Reseteaza Istoricul?',
      'Vrei sa stergi tot istoricul ?',
      [
        { text: 'Sterge', onPress: () => this.props.reset(), style: 'destructive' },
        { text: 'Renunta', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  onPressEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  onPress = ({ word }) => {
    this.props.navigation.navigate('definition', { word });
  }
  
  renderItem = ({ item, index }) => (
    <Term 
      item={item} 
      fontSize={this.props.fontSize}
      onPress={() => this.onPress(item)} 
      delete={this.state.editing} 
      onPressDelete={() => this.props.delete(index)} 
    />
  );

  render() {
    const empty = this.props.history.length === 0;
    return (
      <SafeAreaView style={styles.safeView}>
        <Header 
          noBack 
          leftButton={!empty && 'trash-o'}
          rightButton={!empty && 'pencil-square-o'} 
          onLeftPress={this.onPressReset}
          onRightPress={this.onPressEdit}
          title={'Istoric'} 
        />
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={this.props.history}
          renderItem={this.renderItem}     
          extraData={this.state.editing} 
          style={styles.white} 
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  history: state.history.payload,
  fontSize: state.settings.font.size,
});

const mapDispatchToProps = (dispatch) => ({
  delete: (index) => dispatch(HistoryActions.historyDelete(index)),
  reset: () => dispatch(HistoryActions.historyReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
