import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Voice from 'react-native-voice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { filter, some, includes } from 'lodash/collection';
import { debounce } from 'lodash/function';

export default class Search extends Component {

  static defaultProps = {
    data: [],
    placeholder: 'Caută...',
    placeholderTextColor: 'lightgray',
    focusOnLayout: false,
    autoCapitalize: 'sentences',
    allDataOnEmptySearch: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      input: props.input || '',
      show: true,
      started: false,
      recognized: false,
      results: [],
    };
    this.timerStart = null;
    this.timerStop = null;
  }

  componentWillMount() {
    this.voiceAvailable = Voice.isAvailable().then(e => {
      if (e === 1) {
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechError = this.onSpeechError;
        return true;
      }
      return false;
    });
  }

  componentDidMount() {
    if(this.props.autoFocus && false) {
      this.timerStart = setTimeout(() => {
        this.startRecognition();
      }, 3500);
    }
  }

  componentWillUnmount() {
    if(this.timerStart) {
      clearTimeout(this.timerStart);
      this.timerStart = null;
    }
    if(this.timerStop) {
      clearTimeout(this.timerStop);
      this.timerStop = null;
    }
    if (this.voiceAvailable) {
      Voice.removeAllListeners()
    }
  }

  onSpeechStart = () => {
    this.setState({ started: true, recognized: false });
    this.timerStop = setTimeout(async ()=> {
      if (this.state.started) {
        await Voice.stop();
        await Voice.cancel();
      }
    }, 7000);
    // console.log('started');
  }

  onSpeechEnd = () => {
    this.setState({ started: false });
    // console.log('end');
  }

  onSpeechRecognized = ({ isFinal }) => {
    this.setState({ 
      recognized: isFinal, 
      started: !isFinal,
    });
    this.onChangeText(this.state.results[0]);
    // console.log('recognized', isFinal);
  }

  onSpeechResults = ({ value }) => {
    this.setState({ results: value });
    // console.log('results', value);
  }

  onSpeechError = ({ error: { message } }) => {
    this.setState({ started: false, recognized: false });
    // console.log('error', message);
  }
  
  onChangeText = (input) => {
    const { handleChangeText, handleSearch, handleResults } = this.props;
    this.setState({ input });
    if (handleChangeText) {
      handleChangeText(input);
    }
    if (handleSearch) {
      handleSearch(input);
    } else {
      debounce(() => {
        // use internal search logic (depth first)!
        if (handleResults) {
          const results = this.internalSearch(input);
          handleResults(results);
        }
      }, 500)();
    }
  }

  getValue = () => this.state.input;

  internalSearch = (input) => {
    const { data, allDataOnEmptySearch } = this.props;
    if (input === '') {
      return allDataOnEmptySearch ? data : [];
    }
    return filter(data, (item) => this.depthFirstSearch(item, input));
  }

  depthFirstSearch = (collection, input) => {
    // let's get recursive boi
    const type = typeof collection;
    // base case(s)
    if (type === 'string' || type === 'number' || type === 'boolean') {
      return includes(collection.toString().toLowerCase(), input.toString().toLowerCase());
    }
    return some(collection, (item) => this.depthFirstSearch(item, input));
  }

  clearInput = () => {
    this.setState({ input: '' });
    this.onChangeText('');
    this.props.onCancel && this.props.onCancel();
  }

  startRecognition = async () => {
    this.setState({
      recognized: false,
      started: false,
      results: [],
    });
    try {
      await Voice.start('ro-RO');
    } catch (error) {
      console.error('voice error', error);
    }
  }

  render = () => {
    const {
      placeholder,
      onSubmitEditing,
      onFocus,
      focusOnLayout,
      autoFocus,
      autoCapitalize,
    } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          ref={(ref) => (this.textInput = ref)}
          onLayout={() => focusOnLayout && this.textInput.focus()}
          style={styles.input}
          onChangeText={this.onChangeText}
          onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
          onFocus={() => onFocus && onFocus()}
          placeholder={placeholder}
          value={this.state.input}
          underlineColorAndroid='transparent'
          returnKeyType='search'
          autoCorrect={false}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
        />
        <TouchableOpacity
          onPress={this.state.input === '' ? null : this.clearInput}
        >
          <Icon
            name={'close'}
            size={24}
            style={{ left: -32, padding: 5, borderColor: 'red', borderWidth: 0, color: this.state.input === '' ? 'white' : 'black' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.startRecognition}
        >
          <Icon
            name={'mic'}
            size={this.state.started ? 40 : 36 }
            color={this.state.started ? 'red' : 'black'}
            style={{ left: -24, borderColor: 'red', borderWidth: 0, borderRadius: 18 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderColor: 'rgba(200,200,200,0.75)',
    borderWidth: 0.75,
    borderRadius: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 42,
  },
  input: {
    ...Platform.select({
      ios: { height: 36 },
      android: { height: 44 },
    }),
    paddingTop: 5,
    width: Dimensions.get('window').width - 80,
    marginLeft: 5,
    fontSize: 18,
  },
  navWrapper: {
    width: Dimensions.get('window').width,
  },
  nav: {
    flex: 1,
    flexBasis: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
