import {
  cadastrarEmail,
  checarTextoPlaceHolderInput,
  inserirEmailAndSenha,
} from "../function/login/utils";
import { url } from "../support/constants";

describe("Testes realizados na rota de cadastro", () => {
  beforeEach(() => {
    cy.visitAndCheck(url, "cadastro");
  });
  it("Deve acessar a pagina, digitar nome, email e senhas validos e validar mensagem de sucesso", () => {
    cadastrarEmail(false);
    cy.get(".alert").contains("Usuário inserido com sucesso");
  });
  it("Deve validar o placeholder dos inputs (Extra)", () => {
    checarTextoPlaceHolderInput("#nome", "Nome");
    checarTextoPlaceHolderInput("#email", "Email");
    checarTextoPlaceHolderInput("#senha", "Password");
  });
});
