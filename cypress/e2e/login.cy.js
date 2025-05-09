import {
  cadastrarEmail,
  checarTextoPlaceHolderInput,
  inserirEmailAndSenha,
} from "../function/login/utils";
import { url } from "../support/constants";

describe("Testes realizados na rota de login", () => {
  let email;
  before(() => {
    email = cadastrarEmail(true);
  });
  beforeEach(() => {
    cy.visitAndCheck(url, "login");
  });
  it("Deve acessar a pagina, digitar nome, email valido e senha invalido e validar mensagem de erro", () => {
    inserirEmailAndSenha(email, "errado");
    cy.get("button").contains("Entrar").click();
    cy.get(".alert").contains("Problemas com o login do usuário");
  });
  it("Deve acessar a pagina, digitar nome, email e senhas validos e validar mensagem de bem vindo", () => {
    inserirEmailAndSenha(email, "teste");
    cy.get("button").contains("Entrar").click();
    cy.get(".alert").contains("Bem vindo, teste!");
  });
  it("Deve validar o placeholder dos inputs (Extra)", () => {
    checarTextoPlaceHolderInput("#email", "Email");
    checarTextoPlaceHolderInput("#senha", "Password");
  });
});
