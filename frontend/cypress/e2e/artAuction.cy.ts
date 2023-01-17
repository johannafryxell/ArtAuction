describe('auction testing', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})


////////////
// LOGIN //
//////////

it("goes to login page", () => {
  cy.visit("http://localhost:3000/");
  cy.get(".header__menu a").last().click();
});

it("logs in", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#email').type('johanna.fryxell@gmail.com', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
  cy.visit("http://localhost:3000/account");
  cy.get(".home__grid--auction__link").last().click();
});

/////////
// BID //
////////
it("places bid", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#email').type('johanna.fryxell@gmail.com', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
  
  cy.get(".home__grid--auction__link").last().click();
});