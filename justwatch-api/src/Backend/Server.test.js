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

describe('/login endpoint tests',  ()=> {
    test('/login endpoint status code and response 404', ()=>{
        //construct a supertest request with our app
        // send an HTTP POST request with data (body)
        return request(webapp).post('/login/')
        .send({player:'', points:3}).expect(404)
        .then((response)=> expect(JSON.parse(response.text).error).toBe('username not provided'));
    });

     test('status code 201 and response', () =>{
        return request(webapp).post('/login/')
        .send(player)
        .expect(201) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('Player with id'));
    }); 
});

describe('/leaders get endpoint tests',  ()=> {
     test('status code 200 and response', () =>{
        return request(webapp).get('/leaders/5')
        .expect(200) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('alex'));
    }); 
});

describe('/leaders put endpoint tests',  ()=> {
    test('status code 201 and response', () =>{
        return request(webapp).post('/login/')
        .send(playerToUpdate)
        .expect(201) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('Player with id'));
    }); 
    test('status code 200 and response', () =>{
        return request(webapp).put('/leaders/')
        .send({player: 'Update2', points: 10})
        .expect(200) // test the response status code
        // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('10'));
   }); 
   test('status code 200 and response', () =>{
    return request(webapp).delete('/delete/Update2')
        .expect(200) // test the response status code
         // process the response
        .then((response)=> expect(true));
}); 
});

describe('/quiz endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
       return request(webapp).get('/quiz/')
       .expect(200) // test the response status code
        // process the response
       .then((response)=> expect(JSON.parse(response.text).message).toContain('Margot Robbie'));
   }); 
});


describe('/delete endpoint tests',  ()=> {
     test('status code 200 and response', () =>{
        request(webapp).post('/login/')
        .send(playerToDelete);
        return request(webapp).delete('/delete/delete2')
        .expect(200) // test the response status code
         // process the response
        .then((response)=> expect(true));
    }); 
});




