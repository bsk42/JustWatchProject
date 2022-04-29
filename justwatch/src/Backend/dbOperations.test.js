/* eslint-disable jest/no-conditional-expect */
/* eslint-disable no-undef */
/**
* @jest-environment jsdom
*/

// import dbOperations
const dbModule = require('./dbOperations');

// MongoDB URL
const url = 'mongodb+srv://cis350Final:cis350Final@cluster0.gq1yt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let db; 

const player = {
    username: 'testuser',
    password: 'password',
    email: 'testuser@sample.com',
    name: 'test'
   };

beforeAll(async () => {
    db = await dbModule.connect(url);
});

test('addPlayer inserts a new player', async () =>{
    //call addPlayer
    await dbModule.register(db, player)
    // find testplayer in the DB
    const newPlayer = await db.collection('Users').findOne({username: 'testuser'});

    expect(newPlayer.username).toEqual('testuser');
});

test('login returns user', async () =>{
    //call addPlayer
    const result = await dbModule.login(db, 'testuser', 'password');
    expect(result.username).toEqual('testuser');
});

test('login does returns user wrong password', async () =>{
    //call addPlayer
    try{
        const result = await dbModule.login(db, 'testuser', 'password');
     
    } catch(err){    
        expect(err.message).toBe('could not login');
    }  
});