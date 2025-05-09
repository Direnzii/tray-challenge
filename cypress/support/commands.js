Cypress.Commands.add("visitAndCheck", (url, rota) => {
  cy.visit(`${url}/${rota}`);
  cy.location("pathname").should("eq", `/${rota}`);
});
