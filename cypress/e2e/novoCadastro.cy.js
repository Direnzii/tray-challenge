import {
  cadastrarEmail,
  checarTextoPlaceHolderInput,
} from "../function/login/utils";
import { URL_SEU_BARRIGA } from "../support/env";

describe("Testes realizados na rota de cadastro", () => {
  beforeEach(() => {
    cy.visitAndCheck(URL_SEU_BARRIGA, "cadastro");
  });
  it("Deve acessar a pagina, digitar nome, email e senhas validos e validar mensagem de sucesso (Cenario 1)", () => {
    cadastrarEmail(false);
    cy.get(".alert").contains("Usuário inserido com sucesso");
  });
  it("Deve validar o placeholder dos inputs (Extra)", () => {
    checarTextoPlaceHolderInput("#nome", "Nome");
    checarTextoPlaceHolderInput("#email", "Email");
    checarTextoPlaceHolderInput("#senha", "Password");
  });
});
