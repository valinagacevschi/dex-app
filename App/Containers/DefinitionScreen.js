import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DefinitionsActions from '../Redux/DefinitionsRedux';
import Header from '../Components/Header';
import AlertMessage from '../Components/AlertMessage';
// Styles
import xstyles from './Styles/DefinitionScreenStyle';

class DefinitionScreen extends Component {
  constructor(props) {
    super(props);
    this.params = props.navigation.state.params;
    const word = this.params.word.replace(' (subst.)', '')
      .replace(' (pref.)', '').replace(' (adj.)', '')
      .replace(' (pl. -e)', '')
      .replace(' (pl. -uri)', '')
      .replace(' (adj.)', '');
    props.getDefinitions(word);
  }

  renderSeparator = () => (
    <View
      style={{
        height: 0.75,
        width: '110%',
        backgroundColor: '#CED0CE',
        marginLeft: '-5%',
        marginVertical: 10
      }}
    />
  );

  renderItem = ({ item }) => {
    const htmlContent = `<div>${item.htmlRep}</div> <p>Dicționar: ${item.sourceName}</p>`;
    return (
      <View style={styles.htmlBox} >
        <HTMLView 
          // stylesheet={styles.css}
          stylesheet={{ div: { fontSize: this.props.fontSize } }}
          value={htmlContent}
        />
      </View>
    );
  }
  
  render() {
    const show = this.props.definitions && this.props.definitions.length === 0;
    return (
      <SafeAreaView style={styles.safeView}>
        <Header title={this.params.word} />
        <ScrollView style={styles.container}>
          <AlertMessage show={show} title='Definitia nu a fost gasita' />
          <FlatList 
            contentContainerStyle={{ padding: 10 }}
            keyExtractor={(item, index) => `${index}`}
            data={this.props.definitions}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = {
  ...xstyles,
  htmlBox: { 
    // paddingBottom: 10,
    // marginBottom: 5,
    // borderColor: '#222', 
    // borderBottomWidth: 0.75 
  },
  css: {
    div: {
      fontSize: 16,
    },    
  }
};

const mapStateToProps = (state) => ({
  fetching: state.definitions.fetching,
  definitions: state.definitions.payload,
  fontSize: state.settings.font.size,
});

const mapDispatchToProps = (dispatch) => ({
  getDefinitions: (path) => dispatch(DefinitionsActions.definitionsRequest(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(DefinitionScreen);
