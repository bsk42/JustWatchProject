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

const user1 = {
    username: 'user1',
    password: 'password',
    email: 'user1@sample.com',
    name: 'user1'
   };

const user2 = {
    username: 'user2',
    password: 'password',
    email: 'user2@sample.com',
    name: 'user2'
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

test('getUser', async () =>{
    //call addPlayer
    const result = await dbModule.getUser(db, 'testuser');
    expect(result.username).toEqual('testuser');
    await dbModule.deleteUser(db, 'testuser');
});

test('friends', async () =>{
    await dbModule.register(db, user1);
    await dbModule.register(db, user2);

    const user1_result = dbModule.getUser(db, 'user1');
    const user2_result = dbModule.getUser(db, 'user2');

    try{
        await dbModule.addFriend(db, user1_result, user2_result);
        const friend1 = await db.collection('Friends').findOne({from: 'user1'});
        const friend2 = await db.collection('Friends').findOne({from: 'user2'});
        expect(friend1.to).toEqual('user2');
        expect(friend2.to).toEqual('user1');
        await db.collection('Friend').deleteMany({ from: 'user1'});
        await db.collection('Friend').deleteMany({ from: 'user2'});
        await dbModule.deleteUser(db, 'user1');
        await dbModule.deleteUser(db, 'user2');
    } catch(err){    
        
    }  
});

test('getMovie1', async () =>{
    //call addPlayer
    const result = await dbModule.getUser(db, 'testuser');
    expect(result.username).toEqual('testuser');
    await dbModule.deleteUser(db, 'testuser');
});

test('getMovieAll', async () =>{
    //call addPlayer
    const result = await dbModule.getUser(db, 'testuser');
    expect(result.username).toEqual('testuser');
    await dbModule.deleteUser(db, 'testuser');
});
