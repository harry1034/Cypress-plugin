describe('Post Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/post/index'); // Common visit for all tests
  });

  it('Should display the correct heading', () => {
    cy.get('h1.text-center')
      .should('be.visible')
      .should('have.text', 'Angular 17 CRUD Application');
  });

  it('Should have the correct table headers', () => {
    cy.get('thead tr').within(() => {
      cy.get('th').should('have.length', 4);
      cy.get('th').eq(0).should('have.text', 'Id');
      cy.get('th').eq(1).should('have.text', 'Title');
      cy.get('th').eq(2).should('have.text', 'Post');
      cy.get('th').eq(3).should('have.text', 'Action');
    });
  });

  it('Should have at least one row in the table', () => {
    cy.get('tbody tr')
      .its('length')
      .should('be.gte', 1);
  });

  it('Should have a Create Post button', () => {
    cy.get('a.btn.btn-success[routerLink="/post/create/"]')
      .should('contain.text', 'Create Post');
  });


  it('Should navigate to create post page on click of create post button', () => {
    cy.get('a.btn.btn-success[routerLink="/post/create/"]')
      .click()

    cy.url().should('include', '/post/create');
    cy.get('h1.text-center') // Target the heading element
      .should('be.visible') // Ensure it's visible
      .should('have.text', 'Create New Post here.. ☺'); // Validate the exact text

    cy.get('form').should('be.visible');
    cy.get('input#title').should('be.visible');
    cy.get('input#body').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').should('contain.text', 'Create');
  });

  it('Initially submit button should be disabled', () => {
    cy.get('a.btn.btn-success[routerLink="/post/create/"]')
      .click()
    cy.get('button[type="submit"]').should('be.disabled')
  });


  it('Should redirect to home page on post creation', () => {
    cy.get('a.btn.btn-success[routerLink="/post/create/"]')
      .click()
    cy.get('input#title').type('Sample Title');
    cy.get('input#body').type('This is a sample post.');
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    // Assuming successful form submission redirects or provides a success message
    cy.url().should('not.include', '/post/create'); // Ensure navigation happens
    cy.url().should('include', '/post/index'); // Ensure navigation happens
  });

});
