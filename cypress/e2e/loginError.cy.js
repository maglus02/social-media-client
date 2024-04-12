describe(`Login Error Test`, () => {
  it(`should log in with valid credentials`, () => {
    cy.visit(`https://maglus02.github.io/social-media-client/`);
    cy.wait(1000);
    cy.get('.modal-footer button[data-auth="login"]')
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get(`#loginEmail`).type(`thisemailisinvalid@noroff.no`);
    cy.get(`#loginPassword`).type(`invalidpassword`);
    cy.get(`button.btn-success`).contains("Login").click();
    cy.wait(500);
    cy.on("window:alert", (alert) => {
      expect(alert).to.contain(
        "Either your username was not found or your password is incorrect",
      );
    });
  });
});
