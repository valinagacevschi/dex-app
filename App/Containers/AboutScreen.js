import React, { Component } from 'react';
import { ScrollView, Text, SafeAreaView } from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux';
import Header from '../Components/Header';
// Styles
import xstyles from './Styles/AboutScreenStyle';

export default class AboutScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <Header title='Despre DexApp' />
        <ScrollView style={styles.container}>
          <Text style={styles.text} >
            DexApp a fost creat de Costin Nagacevschi și de Vali Nagacevschi. 
          </Text>
          <Text style={styles.text} >
             Acesta a fost un proiect de week-end la ideea lui Costin și a durat 4 zile. 
          </Text>
          <Text style={styles.text} >
             Aplicația a fost publicată în AppStore pentru iOS și în Google Play pentru android. 
          </Text>  
          <Text style={styles.text} >
             Vă mulțumim că ați folosit aplicația DexApp și am aprecia un review pe pagina de Store.           
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = {
  ...xstyles,
  container: {
    ...xstyles.container,
    padding: 10,
  },
  text: {
    margin: 5,
    fontSize: 16,
  }
};
