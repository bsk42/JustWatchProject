/**
* @jest-environment jsdom
*/


import '@testing-library/jest-dom/extend-expect';

const fetcher = require('./fetcher');
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");


let mock;


const BASE_URL = 'https://powerful-reaches-01306.herokuapp.com'

const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

  test('get movies', async () => {
	   const sampleMovie = {
	    title: "Borat",
	    description: "2006 ‧ Adventure ‧ 1h 24m Kazakh TV talking head Borat is dispatched to the United States to report on the greatest country in the world. With a documentary crew in tow, Borat becomes more interested in locating and marrying Pamela Anderson.",
	    streaming: "prime",
	    image: "https://m.media-amazon.com/images/I/51RPHFy00cL._AC_.jpg",
	    trailer: "https://www.imdb.com/video/imdb/vi1712300569/imdb/embed",
	    rating: "7.3",
	   }
    const json = await fetcher.getMovies();
       expect(json).toEqual([]);
});

    test('get users', async () => {
    const json = await fetcher.getUsers('kush1234', 'kush1234');
    expect(json).toEqual([]);
});

  test('get interactions', async () => {
    const json = await fetcher.getInteractions();
    expect(json).toEqual([]);
}); 

  test('get user', async () => {
    const json = await fetcher.getUser();
    expect(json).toEqual([]);
}); 

  test('get new movie', async () => {
    const json = await fetcher.getNewMovie();
    expect(json).toEqual([]);
}); 


  test('get friendslist', async () => {
    const json = await fetcher.getFriendsList();
    expect(json).toEqual(undefined);
}); 

  test('get register', async () => {
    const json = await fetcher.register();
    expect(json).toEqual([]);
});


  test('delete user', async () => {
    const json = await fetcher.deleteUser();
    expect(json).toEqual([]);
}); 

  test('update score', async () => {
    const json = await fetcher.updateScore();
    expect(json).toEqual([]);
}); 

    test('update score', async () => {
    const json = await fetcher.interactWithMovie();
    expect(json).toEqual(undefined);
}); 
