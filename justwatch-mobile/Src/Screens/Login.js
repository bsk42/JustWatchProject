/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { getUser } from '../Services/fetcher';
import { setLoggedInUser, getL } from '../Modules/LoginLocalStorage';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    textAlign: 'center',
  },
  input: {
    borderColor: 'black',
    textAlign: 'center',
  },
  textInputBar: {
    height: 60,
    borderWidth: 3,
    borderRadius: 5,
    padding: 15,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  textInputText: {
    fontSize: 16,
  },
});

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(usernameInput, passwordInput) {
    //check if user exists
    getUser(username, password).then((data) => {
      // if user exists, set current user in local storage
      if (data.message) {
        setLoggedInUser(data.message); 
        navigation.navigate("MovieSelectionScreen");
      } else { //if info incorrect
        alert("Incorrect Username or Password");
      }
    }).catch((err) => {
      // if user does not, show error
      console.log(err);
    });
  }

  return (
    <View>
      <Text
          testID="welcome-text"
          style={{ fontSize: 16, marginVertical: 10, marginHorizontal: 10 }}
        >
          Please Login:
        </Text>
      <View style={styles.textInputBar}>
        <TextInput
          testID="username-input"
          style={styles.textInputText}
          styles={styles.input}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
      />
      </View>
      <View style={styles.textInputBar}>
        <TextInput
          testID="password-input"
          style={styles.textInputText}
          styles={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
      />
      </View>
  <Button
    testID="login-button"
    styles={styles.loginButton}
    // eslint-disable-next-line react/jsx-no-bind
    onPress={loginUser}
    title="Login"
  />
    </View>
    
  );
}

export default LoginScreen;
