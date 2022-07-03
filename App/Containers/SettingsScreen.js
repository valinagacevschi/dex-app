import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  Linking,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/FontAwesome';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SettingsActions from '../Redux/SettingsRedux';
import NotificationActions from '../Redux/NotificationRedux';
import Header from '../Components/Header';
// import AlertMessage from '../Components/AlertMessage';
// Styles
import xstyles from './Styles/SettingsScreenStyle';

const appID = '1312745885';
const playID = 'com.appcenter.dexapp';

class SettingsScreen extends Component {
  state = {
    switchValue: true
  }

  onNotifyChange = (value) => {
    this.props.setNotify(value);
    this.props.saveToken(this.props.token || '1234567890', value);
  }

  onValueChange = (value) => {
    this.props.setKeyboard(value);
  }

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <Header noBack title={'Setări'} />
        <View style={styles.container} >
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50} >
          <SettingsList.Item
            icon={<Icon name='font' style={styles.icon} color={'#aaa'} />}
            title='Mărimea textului'
            titleInfo={this.props.fontName}
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => this.props.navigation.navigate('fonts')}
          />
          <SettingsList.Item
            icon={<Icon name='comment-o' style={styles.icon} color={'#aaa'} />}
            hasSwitch
            switchState={this.props.notify}
            switchOnValueChange={this.onNotifyChange}
            hasNavArrow={false}
            title='Notificare cuvantul zilei'
          />
          <SettingsList.Item
            icon={<Icon name='keyboard-o' style={styles.icon} color={'#aaa'} />}
            hasSwitch
            switchState={this.props.showKeyboard}
            switchOnValueChange={this.onValueChange}
            hasNavArrow={false}
            title='Arată tastatura la start'
          />
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={<Icon name='star-half-o' style={styles.icon} color={'#aaa'} />}
            title='Evaluati DexApp'
            onPress={() => Linking.openURL(Platform.OS === 'ios' ? `itms-apps://itunes.apple.com/app/viewContentsUserReviews?id=${appID}` : `market://details?id=${playID}`)}
          />
          <SettingsList.Item
            icon={<Icon name='book' style={styles.icon} color={'#aaa'} />}
            title='Despre DexApp'
            onPress={() => this.props.navigation.navigate('about')}
          />
          <SettingsList.Item
            icon={<Icon name='copyright' style={styles.icon} color={'#aaa'}  />}
            title='Copyright'
            titleInfo='CevaDesign'
            onPress={() => Alert.alert('Copyright CevaDesign 2017')}
          />
          <SettingsList.Item
            icon={<Icon name='database' style={styles.icon} color={'#aaa'}  />}
            title='Sursa'
            titleInfo='Dex Online'
            onPress={() => 
              Alert.alert(
                'DexOnline',
                'Deschideti pagina in browser ?',
                [
                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'OK', onPress: () => Linking.openURL('https://dexonline.ro') }
                ]
              )}
          />
        </SettingsList>
        </View>
        {/* <ScrollView style={styles.container}>
          <AlertMessage show title='In constructie' />
        </ScrollView> */}
      </SafeAreaView>
    );
  }
}

const styles = {
  ...xstyles,
  icon: {
    marginTop: 13,
    marginLeft: 10,
    fontSize: 24,
  }
};

const mapStateToProps = (state) => ({
  fontName: state.settings.font.name,
  showKeyboard: state.settings.showKeyboard,
  notify: state.settings.notify,
  token: state.notification.token,
});

const mapDispatchToProps = (dispatch) => ({
  setKeyboard: (showKeyboard) => dispatch(SettingsActions.setKeyboard(showKeyboard)),
  setNotify: (notify) => dispatch(SettingsActions.setNotify(notify)),
  saveToken: (token, notify) => dispatch(NotificationActions.saveToken(token, notify)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
