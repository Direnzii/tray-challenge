import { getEmailAleatorio } from "../function/login/utils";

describe("Testes realizados na rota de cadastro", () => {
  beforeEach(() => {
    cy.visitAndCheck("https://seubarriga.wcaquino.me", "cadastro");
  });
  it("Deve acessar a pagina, digitar nome, email e senhas validos e validar mensagem de sucesso", () => {
    let email = getEmailAleatorio();
    cy.get("#nome").type("teste");
    cy.get("#email").type(email);
    cy.get("#senha").type("teste");
    cy.get('[value="Cadastrar"]').click();
    cy.get(".alert").contains("Usuário inserido com sucesso");
  });
});
