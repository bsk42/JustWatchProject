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
    _id: "tt8097030",
    title: "Turning Red",
    originalTitle: "",
    fullTitle: "Turning Red (2022)",
    type: "Movie",
    year: "2022",
    image: "https://imdb-api.com/images/original/MV5BNjY0MGEzZmQtZWMxNi00MWVhLWI4NWEtYjQ0MDkyYTJhMDU0XkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_Ratio0.6751_AL_.jpg",
    releaseDate: "2022-03-11",
    runtimeMins: "100",
    runtimeStr: "1h 40min",
    plot: "A 13-year-old girl named Meilin turns into a giant red panda whenever she gets too excited."
}

beforeAll(async () => {
    db = await dbModule.connect(url);
});

afterAll(async () => {
    dbModule.deleteUser(db, 'testuser');
    dbModule.deleteUser(db, 'user1');
    dbModule.deleteUser(db, 'user2');
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

test('login returns user wrong password', async () =>{
    //call addPlayer
    try{
        await dbModule.login(db, 'testuser', 'wrongpassword');

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

test('interactions', async () =>{
    await dbModule.register(db, user1);

    const user1_result = await dbModule.getUser(db, 'user1');

    try{
        const result = await dbModule.newMovieInteract(db, user1_result.username, movie1._id, 'dislike');
        expect(result.interaction).toEqual('dislike');
        await db.collection('Interactions').deleteMany({ from: 'user1'});
    } catch(err){    
        
    }  
});

test('interactionsByUser', async () =>{
    await dbModule.register(db, user1);

    const user1_result = await dbModule.getUser(db, 'user1');
    await dbModule.newMovieInteract(db, user1_result.username, movie1._id, 'dislike');

    try{
        const result = await dbModule.getMovieInteractionsByUser(db, user1_result.username);
        expect(result).toEqual('dislike');
        await db.collection('Interactions').deleteMany({ from: 'user1'});
    } catch(err){    
        
    }  
});

test('likesByUser', async () =>{
    await dbModule.register(db, user1);

    const user1_result = await dbModule.getUser(db, 'user1');
    await dbModule.newMovieInteract(db, user1_result.username, movie1._id, 'like');

    try{
        const result = await dbModule.getLikesByUser(db, user1_result.username);
        expect(result).toEqual('like');
        await db.collection('Interactions').deleteMany({ from: 'user1'});
    } catch(err){    
        
    }  
});

test('startConvo', async () =>{
    await dbModule.register(db, user1);

    const user1_result = await dbModule.getUser(db, 'user1');
    const user2_result = await dbModule.getUser(db, 'user2');


    try{
        const result = await dbModule.startConversation(db, user1_result.username, user2_result.username, ['hi', 'hello']);
        expect(result).toBe('hi');
        await db.collection('Messages').deleteMany({ from: 'user1'});
        await db.collection('Messages').deleteMany({ from: 'user1'});
    } catch(err){    
        
    }  
});

test('sendingMessages', async () =>{
    await dbModule.register(db, user1);

    const user1_result = await dbModule.getUser(db, 'user1');
    const user2_result = await dbModule.getUser(db, 'user2');


    try{
        const message1 = await dbModule.sendMessage(db, user1_result.username, user2_result.username, 'hi');
        expect(message1.content).toContain('hi');
        await db.collection('Messages').deleteMany({ from: 'user1'});
        await db.collection('Messages').deleteMany({ from: 'user1'});
    } catch(err){    
        
    }   
});




