// import supertest
const request = require('supertest');

// import our web app
const webapp = require('./server');

// Import database operations
const dbModule = require('./dbOperations');


// MongoDB URL
const url = 'mongodb+srv://cis350Final:cis350Final@cluster0.gq1yt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let db; 

beforeAll(async () => {
    db = await dbModule.connect(url);
});


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

afterAll(async () => {
    dbModule.deleteUser(db, 'testuser');
    dbModule.deleteUser(db, 'user1');
    dbModule.deleteUser(db, 'user2');
});

describe('/register endpoint tests',  ()=> {
    test('/register endpoint status code and response 500', ()=>{
        return request(webapp).post('/register')
        .send({player:'', points:3}).expect(500)
        .then((response)=> expect(JSON.parse(response.text).error).toBe('try again later'));
    });

     test('status code 201 and response', () =>{
        return request(webapp).post('/register')
        .send(player)
        .expect(201) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('Player with username'));
    }); 
});


describe('/movies endpoint tests',  ()=> {

     test('status code 200 and response', () =>{
        return request(webapp).get('/movies')
        .expect(200) // test the response status code
        .then((response)=> expect(JSON.parse(response.text).message).toContain('tt8097030'));
    }); 
});

describe('/movies/:id get endpoint tests',  ()=> {
    test('/movies/:id endpoint status code and response 500', ()=>{
        return request(webapp).get('/movies/:id')
        .expect(500)
        .then((response)=> expect(JSON.parse(response.text).error).toBe('error retrieving movie'));
    });
});

describe('/users get endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
        return request(webapp).get('/users')
        .expect(200) // test the response status code
    }); 
});

describe('/users/getUser get endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
        return request(webapp).get('/users/getUser')
        .expect(500) // test the response status code
    }); 
});

describe('/users/getNewMovie get endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
        return request(webapp).get('/users/getNewMovie')
        .expect(200) // test the response status code
    }); 
});

describe('/users/friendsList get endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
        return request(webapp).get('/users/friendsList')
        .expect(200) // test the response status code
    }); 
});

describe('/interactions get endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
        return request(webapp).get('/interactions')
        .expect(200) // test the response status code
    }); 
});

describe('/newInteraction post endpoint tests',  ()=> {
     test('status code 200 and response', () =>{
        return request(webapp).post('/newInteraction')
        .send(db, player.username, movie1, 'like')
        .expect(200) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('new interaction added'));
    }); 
});

describe('/users/friends/:username get endpoint tests',  ()=> {
    test('/users/friends/:username endpoint status code and response 200', ()=>{
        return request(webapp).get('/users/friends/:username')
        .expect(200)
    });
});

describe('/users/addFriend post endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
        return request(webapp).post('/users/addFriend')
        .expect(201) // test the response status code
    }); 
});

describe('/messages get endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
        return request(webapp).get('/messages')
        .expect(200) // test the response status code
    }); 
});




describe('/delete endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
       request(webapp).post('/register')
       .send(player);
       return request(webapp).delete('/delete/:player')
       .expect(500) // test the response status code
        // process the response
        .then((response)=> expect(JSON.parse(response.text).error).toBe('try again later'));
   }); 
});








