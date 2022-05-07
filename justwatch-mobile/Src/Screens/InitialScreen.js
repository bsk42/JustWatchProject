import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';


function InitialScreen({ navigation }) {


    const styles = StyleSheet.create({

    });

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleRegister = () => {
   // navigator('/register');
  };

  return (
    <View>
      <Button onPress={handleLogin} title="LOGIN"/>
      <Button onPress={handleRegister}title="REGISTER"/>
    </View>
  );
}

export default InitialScreen;