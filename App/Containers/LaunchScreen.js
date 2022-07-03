import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import AppleAdsAttribution from 'react-native-apple-ads-attribution';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
import WordsActions from '../Redux/WordsRedux';
import HistoryActions from '../Redux/HistoryRedux';
import SearchBar from '../Components/SearchBar';
import Word from '../Components/Word';
// Styles
import xstyles from './Styles/LaunchScreenStyles';
import { Metrics } from '../Themes';

const tracker = new GoogleAnalyticsTracker('UA-109658921-1');

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
    };
  }

  componentWillMount() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-2872478184058161/9463078432');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd()
      .then(
        () => AdMobInterstitial.showAd(),
        (error) => console.log('AdMobInterstitial Error', error)
      );
  }

  async componentDidMount() {
    const attributionData = await AppleAdsAttribution.getAttributionData();
    // console.log('attributionData', attributionData);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.words && newProps.words.length === 1) {
      this.props.navigation.navigate('definition', { word: newProps.words[0]});
    }
  }

  onPress = (word) => {
    this.props.addWord({ word, date: new Date().toISOString().slice(0, 10) });
    tracker.trackEvent('Termen', word);
    this.props.navigation.navigate('definition', { word });
  }

  onAdFailedToLoad = (error) => {
    // console.log('AdMobBanner onAdFailedToLoad', error);
  }

  bannerError = (params) => {
    // console.log('AdMobBanner banner error', params);
  }

  search = (input) => {
    this.setState({ searching: input.length > 2 });
    if (input.length > 2) {
      this.props.search(input);
    } else if (input.length === 0) {
      this.props.reset();
    }
  }

  renderDefinition = ({ title, text, dict, image, choice }) => {
    const width = Metrics.screenWidth - 20;
    return text ? `<h3>${title}</h3><div>${text}</div> \
    <p>${dict}</p><p><img width="${width}" height="${width}" src="${image}"/></p>\
    <p>${choice}</p><br/>` : '';
  }

  renderItem = ({ item }) => (
    <Word word={item} fontSize={this.props.fontSize} onPress={() => this.onPress(item)} />
  );

  render() {
    const { wod, words, showKeyboard, reset, fontSize } = this.props;
    const htmlContent = this.renderDefinition({ ...wod, title: 'Cuvântul Zilei' });
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container} >
        <SearchBar
          autoFocus={showKeyboard}
          autoCorrect={false}
          autoCapitalize={'none'}
          handleSearch={this.search}
          onCancel={() => reset()}
        />
        {!this.state.searching && 
        <ScrollView style={styles.container}>
          <HTMLView
            stylesheet={{ div: { fontSize: fontSize } }}
            value={htmlContent}
          />
        </ScrollView>}
        {(this.state.searching && words && words.length > 1) &&
        <FlatList 
          keyExtractor={(item, index) => `${index}`}
          data={words}
          renderItem={this.renderItem}
        />}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  ...xstyles,
  container: {
    ...xstyles.container,
    paddingHorizontal: 5,
  },
  css: {
    div: {
      fontSize: 26,
    },
  }
};

const mapStateToProps = (state) => ({
  words: state.words.payload,
  wod: state.daily.wordOfDay,
  fontSize: state.settings.font.size,
  showKeyboard: state.settings.showKeyboard,
});

const mapDispatchToProps = (dispatch) => ({
  search: (word) => dispatch(WordsActions.wordsRequest(word)),
  reset: () => dispatch(WordsActions.wordsReset()),
  addWord: (word) => dispatch(HistoryActions.historyAdd(word)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
