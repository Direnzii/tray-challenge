Cypress.Commands.add("visitAndCheck", (url, rota) => {
  cy.visit(`${url}/${rota}`);
  cy.log("teste");
});
