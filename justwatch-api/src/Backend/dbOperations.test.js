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

const movie1 = {
    _id: 'tt1877830',
    rank: "1",
    plot: "When the Riddler, a sadistic serial killer, begins murdering key polit...",
    rankUpDown: "0",
    title: "The Batman",
    fullTitle: "The Batman (2022)",
    year: "2022",
    image: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMD...",
    crew: "Matt Reeves (dir.), Robert Pattinson, Zoë Kravitz",
    imDbRating: "8.4",
    imDbRatingCount: "247929",
    trailer: "https://www.imdb.com/video/imdb/vi3215114777/imdb/embed"
}

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

    const user1_result = await dbModule.getUser(db, 'user1');
    const user2_result = await dbModule.getUser(db, 'user2');

    try{
        await dbModule.addFriend(db, user1_result.username, user2_result.username);
        const friend1 = await db.collection('Friends').findOne({from: 'user1'});
        const friend2 = await db.collection('Friends').findOne({from: 'user2'});
        expect(friend1.to).toEqual('user2');
        expect(friend2.to).toEqual('user1');
        await db.collection('Friend').deleteMany({ from: 'user1'});
        await db.collection('Friend').deleteMany({ from: 'user2'});
    } catch(err){    
        
    }  
});



test('getMovie1', async () =>{
    //call addPlayer
    const result = await dbModule.getMovieByID(db, movie1._id);
    expect(result._id).toEqual(movie1._id);
});

test('movie doesnt exist', async () =>{
    try{
        const result = await dbModule.getMovieByID(db, '111111111111');
    } catch(err){    
        expect(err.message).toBe('could not find movie');
    }  
});

test('user doesnt exist', async () =>{
    try{
        const result = await dbModule.deleteUser(db, '111111111111');
    } catch(err){    
        expect(err.message).toBe('could not delete player');
    }  
});

test('cannot login', async () =>{
    try{
        const result = await dbModule.login(db, '111111111111', 'aaaa');
    } catch(err){    
        expect(err.message).toBe('could not login');
    }  
});

test('getMoviesAll', async () =>{
    //call addPlayer
    const result = await dbModule.getMovies(db);
    expect(result[0]._id).toEqual(movie1._id);
});

test('cannot get all movies', async () =>{
    try{
        const da = 1
        const result = await dbModule.getMovies(da);
    } catch(err){    
        expect(err.message).toBe('could not find all movies');
    }  
});


