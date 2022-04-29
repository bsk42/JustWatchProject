// justWatch.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('test home screen login', () => {
	it('user story home page', () =>{
		cy.visit('http://localhost:3000');
		cy.get('button').contains("LOGIN");
		cy.get('button').contains("REGISTER");
		cy.get('button').contains("LOGIN").click();
		cy.get('button').contains("Login");
	})
})

describe('test home screen register', () => {
	it('user story home page', () =>{
		cy.visit('http://localhost:3000');
		cy.get('button').contains("LOGIN");
		cy.get('button').contains("REGISTER");
		cy.get('button').contains("REGISTER").click();
		cy.get('button').contains("Register");
	})
})

describe('test movie screen like', () => {
	it('user story movie selection', () =>{
		cy.visit('http://localhost:3000');
		cy.get('button').contains("Movie Selection");
		cy.get('button').contains("Movie Selection").click();
		cy.get('button').contains("Like");
		cy.get('button').contains("Dislike");
		cy.get('button').contains("SuperLike");
		cy.get('div').contains("Reviews");
		cy.get('div').contains("Trailer");
		cy.get('img').should('be.visible');
		cy.get('button').contains("Like").click();
		cy.get('div').contains("Reviews");
		cy.get('div').contains("Trailer");
	})
})

describe('test movie screen dislike', () => {
	it('user story movie selection', () =>{
		cy.visit('http://localhost:3000');
		cy.get('button').contains("Movie Selection");
		cy.get('button').contains("Movie Selection").click();
		cy.get('button').contains("Like");
		cy.get('button').contains("Dislike");
		cy.get('button').contains("SuperLike");
		cy.get('div').contains("Reviews");
		cy.get('div').contains("Trailer");
		cy.get('img').should('be.visible');
		cy.get('button').contains("Dislike").click();
		cy.get('div').contains("Reviews");
		cy.get('div').contains("Trailer");
	})
})

describe('test movie screen SuperLike', () => {
	it('user story movie selection', () =>{
		cy.visit('http://localhost:3000');
		cy.get('button').contains("Movie Selection");
		cy.get('button').contains("Movie Selection").click();
		cy.get('button').contains("Like");
		cy.get('button').contains("Dislike");
		cy.get('button').contains("SuperLike");
		cy.get('div').contains("Reviews");
		cy.get('div').contains("Trailer");
		cy.get('img').should('be.visible');
		cy.get('button').contains("SuperLike").click();
		cy.get('div').contains("Reviews");
		cy.get('div').contains("Trailer");
	})
})

describe('test group screen', () => {
	it('user story groups interaction', () =>{
		cy.visit('http://localhost:3000');
		cy.get('button').contains("Groups");
		cy.get('button').contains("Groups").click();
		cy.get('button').contains("Message");
		cy.get('button').contains("Message").click();
		cy.get('button').contains("Send");
	})
})

describe('test analytics screen', () => {
	it('user story view analytics', () =>{
		cy.visit('http://localhost:3000');
		cy.get('button').contains("Analytics");
		cy.get('button').contains("Analytics").click();
		cy.get('div').contains("My Watch Stats");
		cy.get('div').contains("Average User Watch Stats");
		cy.get('div').contains("Movies Liked");
		cy.get('div').contains("Movies Disliked");
		cy.get('div').contains("Movies Superliked");
		cy.get('div').contains("Weekly App Usage");
	})
})

describe('test profile screen', () => {
	it('user story view profile', () =>{
		cy.visit('http://localhost:3000');
		cy.get('button').contains("Profile");
		cy.get('button').contains("Profile").click();
		cy.get('div').contains("Name");
		cy.get('div').contains("Username");
		cy.get('div').contains("Genre");
		cy.get('div').contains("Streaming Services");
		cy.get('div').contains("Profile");
		cy.get('button').contains("Back");
		cy.get('img').should('be.visible');
		
	})
})

