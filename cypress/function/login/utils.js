import { nomePadrao, senhaPadrao } from "../../support/constants";
import { URL_SEU_BARRIGA } from "../../support/env";

export function getEmailAleatorio() {
  /*basicamente essa função retrona um email diferente sempre*/
  const parteAleatoria = Math.random().toString(36).substring(2, 10);
  const dominioAleatorio = Math.random().toString(36).substring(2, 8);
  return `${parteAleatoria}@${dominioAleatorio}.com`;
}

export function cadastrarEmail(realizarVisita) {
  if (realizarVisita) {
    cy.visitAndCheck(URL_SEU_BARRIGA, "cadastro");
  }
  let email = getEmailAleatorio();
  cy.get("#nome").type(nomePadrao);
  inserirEmailAndSenha(email, senhaPadrao);
  cy.get('[value="Cadastrar"]').click();
  return email;
}

export function inserirEmailAndSenha(email, senha) {
  cy.get("#email").type(email);
  cy.get("#senha").type(senha);
}

export function adicionarUmaConta(nome) {
  cy.visitAndCheck(URL_SEU_BARRIGA, "addConta");
  cy.get("#nome").type(nome);
  cy.get("button").contains("Salvar").click();
  cy.get(".alert").contains("Conta adicionada com sucesso!");
}

export function checarExtrato(
  descricao,
  data_do_pagamento,
  conta,
  valor,
  situacao
) {
  const lista_para_checar = [
    descricao,
    data_do_pagamento,
    conta,
    valor,
    situacao,
  ];
  lista_para_checar.forEach((text) => {
    cy.get("#tabelaExtrato").contains(text);
  });
}

export function checarTextoPlaceHolderInput(id, texto) {
  cy.get(id).should("have.attr", "placeholder", texto);
}
