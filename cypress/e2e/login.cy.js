import {
  cadastrarEmail,
  checarTextoPlaceHolderInput,
  inserirEmailAndSenha,
} from "../function/login/utils";
import { nomePadrao, senhaPadrao, textBotaoEntrar } from "../support/constants";
import { URL_SEU_BARRIGA } from "../support/env";

describe("Testes realizados na rota de login", () => {
  let email;
  before(() => {
    email = cadastrarEmail(true);
  });
  beforeEach(() => {
    cy.visitAndCheck(URL_SEU_BARRIGA, "login");
  });
  it("Deve acessar a pagina, digitar email ja cadastrado e senha invalido e validar mensagem de erro (Cenario 2)", () => {
    inserirEmailAndSenha(email, "errado");
    cy.get("button").contains(textBotaoEntrar).click();
    cy.get(".alert").contains("Problemas com o login do usuário");
  });
  it("Deve acessar a pagina, digitar nome, email e senhas validos e validar mensagem de bem vindo (Cenario 3)", () => {
    inserirEmailAndSenha(email, senhaPadrao);
    cy.get("button").contains(textBotaoEntrar).click();
    cy.get(".alert").contains(`Bem vindo, ${nomePadrao}`);
  });
  it("Deve validar o placeholder dos inputs (Extra)", () => {
    checarTextoPlaceHolderInput("#email", "Email");
    checarTextoPlaceHolderInput("#senha", "Password");
  });
});
