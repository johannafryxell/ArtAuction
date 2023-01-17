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
});

it("logs out", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#email').type('johanna.fryxell@gmail.com', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
  cy.visit("http://localhost:3000/account");
  cy.get("button").click();
  cy.visit("http://localhost:3000/");
});

it("types no email", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#password').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
});

it("types no password", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#email').type('johanna.fryxell@gmail.com', {force: true});
  cy.get(".form__input--btn").click();
});

it("types wrong password", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#email').type('johanna.fryxell@gmail.com', {force: true});
  cy.get('#password').type('löseen', {force: true});
  cy.get(".form__input--btn").click();
  cy.get(".form__input--btn").click();
});

it("types incorrect email", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#email').type('johanna.fryxell@gmail.c', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
});

/////////////
// SIGNUP //
///////////
it("creates new account", () => {
  cy.visit("http://localhost:3000/login");
  cy.get(".registerView__btn").click();
  cy.get('#firstName').type('Tester', {force:true});
  cy.get('#lastName').type('Testerson', {force:true});
  cy.get('#email').type('tester@gmail.com', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get('#confirmPassword').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
  cy.visit("http://localhost:3000/account");
});

it("should display required error", () => {
  cy.visit("http://localhost:3000/login");
  cy.get(".registerView__btn").click();
  cy.get('#lastName').type('Testerson', {force:true});
  cy.get('#email').type('tester@gmail.com', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get('#confirmPassword').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
});

it("should display no match error", () => {
  cy.visit("http://localhost:3000/login");
  cy.get(".registerView__btn").click();
  cy.get('#firstName').type('Tester', {force:true});
  cy.get('#lastName').type('Testerson', {force:true});
  cy.get('#email').type('tester@gmail.com', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get('#confirmPassword').type('lös', {force: true});
  cy.get(".form__input--btn").click();
  cy.get(".form__input--btn").click();
});

/////////
// BID //
////////
it("should not place bid", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#email').type('johanna.fryxell@gmail.com', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
  
  cy.get(".home__grid--auction__link").last().click();
  cy.get("input").type("440");
  cy.get("#bidInput").click();
});

it("should bid", () => {
  cy.visit("http://localhost:3000/login");
  cy.get('#email').type('johanna.fryxell@gmail.com', {force: true});
  cy.get('#password').type('lösen', {force: true});
  cy.get(".form__input--btn").click();
  
  cy.get(".home__grid--auction__link").last().click();
  cy.get("input").type("700");
  cy.get("#bidInput").click();
  cy.visit("http://localhost:3000/account");
  cy.get(".auctLink").first()
});