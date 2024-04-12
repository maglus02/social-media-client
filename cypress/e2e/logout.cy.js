describe(`Logout Test`, () => {
  it(`should log in with valid credentials`, () => {
    cy.visit(`https://maglus02.github.io/social-media-client/`);
    cy.wait(1000);
    cy.get('.modal-footer button[data-auth="login"]')
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get(`#loginEmail`).type(`santiagotest@noroff.no`);
    cy.get(`#loginPassword`).type(`Testing123`);
    cy.get(`button.btn-success`).contains("Login").click();
    cy.wait(3000);
    cy.get('button[data-auth="logout"]').click();
    cy.get('.modal-footer button[data-auth="login"]').should("exist");
  });
});
