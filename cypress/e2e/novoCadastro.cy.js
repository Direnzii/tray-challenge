import { cadastrarEmail } from "../function/login/utils";
import { url } from "../support/constants";

describe("Testes realizados na rota de cadastro", () => {
  beforeEach(() => {
    cy.visitAndCheck(url, "cadastro");
  });
  it("Deve acessar a pagina, digitar nome, email e senhas validos e validar mensagem de sucesso", () => {
    cadastrarEmail(false);
    cy.get(".alert").contains("Usuário inserido com sucesso");
  });
});
