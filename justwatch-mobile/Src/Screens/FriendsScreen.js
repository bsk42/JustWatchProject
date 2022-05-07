import React, {useEffect, useState} from 'react';
import { getFriendsList } from '../Services/fetcher';
import "regenerator-runtime/runtime.js";
import {
    Button,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
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
  });

function FriendsScreen({ navigation }) {


    function goToMessage() {
       // navigator('/messaging');
    }

    const [friendsList, setFriendsList] = useState([{
        _id: "6275db4460226a7666661363",
        username: "ben1",
        name: "ben",
        email: "email",
        password: "pass",
        likes: [
            "tt0443453",
            "tt8178634",
            "tt1160419",
            "tt1464335",
            "tt13610562"
        ],
        matches: [
            "tt0443453",
            "tt8178634",
            "tt1160419",
            "tt1464335",
            "tt13610562"
        ],
        numMatches: 5
    }]);

    useEffect(() => {
        console.log("hi");
        getFriendsList().then((data) => setFriendsList(data));
    }, []);

    // let mounted = true;
    //     getFriendsList()
    //     .then((data) => {
    //         if (mounted) {
    //           setFriendsList(data);
    //         }
    //     })
    //     .catch((err) => console.log(err));
    //     return () => mounted = false;


    return (
        <View>
        <View>
            <Button title="Go To Movie Selection" onPress={() => {navigation.navigate("MovieSelectionScreen")}}/>
          <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center"}}>Friends:</Text>
          <FlatList
            data={friendsList}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={{fontSize: 16, fontWeight: "bold", padding: 5}}>{`${item.username}`}</Text>
                <Text style={{padding: 5}}>{`Number likes in common: ${item.numMatches}`}</Text>
                <Text style={{padding: 5}}>{`Movies in common: ${item.movieMatches}`}</Text>
                <Button title="Message"/>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
        
        </View>
    )

}

 // <div className="div">
        //     <div className="users">
        //         <div className="users-container"> 
        //             <ul>
        //                 { friendsList.map(user => 
        //                     <li key={user._id} className="user">
        //                         <div className="user-info-container">
        //                             <div className="user-info">
        //                                 <h4>{user.name}</h4>
        //                                 <p>Email: {user.email}</p>
        //                                 <p>Number Matches: {user.numMatches}</p>
        //                                 <p>Movies you both like: {user.movieMatches}</p>
        //                             </div>
        //                             <div className="user-action">
        //                                 <button className="messageButton" onClick={goToMessage}>Message</button>
        //                             </div>
        //                         </div>
        //                     </li>
        //                 )}
        //             </ul>
        //             <div className="chatbox-container">
        //             <div id="talkjs-container" style={{height: "300px"}}></div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
export default FriendsScreen;