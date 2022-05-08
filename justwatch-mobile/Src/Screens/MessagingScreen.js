import React, {useEffect, useState} from 'react';
import { getMessages, sendMessage } from '../Services/fetcher';
import { getLoggedInUser } from '../Modules/LoginLocalStorage';
import {
    Button,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    TextInput
  } from 'react-native';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 2,
      padding: 10,
      marginVertical: 2,
      marginHorizontal: 16,
    },
    title1: {
      fontSize: 32,
      flex: 1,
    },
    title2: {
      fontSize: 15,
      flex: 0.5,
      fontWeight: 'bold',
    },
    leaderboardView: {
      flex: 7,
    },
    submitView: {
      flex: 1,
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

function MessagingScreen({route, navigation}) {

  const [from, setFrom] = useState('')
  const to = route.params.to;
  const [messages, setmessages] = useState([]);
  const [outgoing, setOutgoing] = useState('');


  useEffect(() =>{

      async function fetchmessages(){
       
        let user = await getLoggedInUser();
        setFrom(user.username);
        let result = await getMessages(from, to);
        setmessages(result);
        console.log(result);
      }
    
    const counterInterval = setInterval(() => {
      fetchmessages();
    }, 5000);

    return () => clearInterval(counterInterval);

  }, [messages]);

  const handleSendMessage = async() =>{
    console.log(to);  
    await sendMessage(from, to, {sender: from, message: outgoing});
  }


    return (
        <View>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={{fontSize: 16, fontWeight: "bold", padding: 5}}>{`${item.sender} : ${item.message}`}</Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
          <TextInput
          testID="message-input"
          style={styles.textInputText}
          styles={styles.input}
          placeholder="message"
          value={outgoing}
          onChangeText={setOutgoing}
          />
          <Button title="Send" onPress={() => handleSendMessage()}/>
        </View>
    )

}

export default MessagingScreen;