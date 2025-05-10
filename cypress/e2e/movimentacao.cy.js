import {
  adicionarUmaConta,
  cadastrarEmail,
  checarExtrato,
  inserirEmailAndSenha,
} from "../function/login/utils";
import { senhaPadrao, textBotaoEntrar } from "../support/constants";
import { URL_SEU_BARRIGA } from "../support/env";

describe("Testes realizados na rota de login", () => {
  let email;
  before(() => {
    email = cadastrarEmail(true);
    inserirEmailAndSenha(email, senhaPadrao);
    cy.get("button").contains(textBotaoEntrar).click();
  });
  beforeEach(() => {
    cy.visitAndCheck(URL_SEU_BARRIGA, "movimentacao");
  });
  it("Deve acessar a pagina, adicionar uma conta, criar uma movimentação e checar a movimentação criada (Cenario 4)", () => {
    const movimentacao_obj = {
      tipo: "Despesa",
      data_movimentacao: "04/04/2025",
      data_do_pagamento: "05/04/2025",
      descricao: "Movimentação teste, #$%@()*&áÁ123/-+°, Desafio Tray",
      interessado: "QAE",
      valor: "6000",
      conta: "conta_1",
      situacao: "Pago",
    };
    adicionarUmaConta("conta_1");
    cy.visitAndCheck(URL_SEU_BARRIGA, "movimentacao");
    cy.get("#tipo").select(movimentacao_obj.tipo);
    cy.get("#data_transacao").type(movimentacao_obj.data_movimentacao);
    cy.get("#data_pagamento").type(movimentacao_obj.data_do_pagamento);
    cy.get("#descricao").type(movimentacao_obj.descricao);
    cy.get("#interessado").type(movimentacao_obj.interessado);
    cy.get("#valor").type(movimentacao_obj.valor);
    cy.get("#conta").type(movimentacao_obj.conta);
    cy.get("#status_pago").click();
    cy.get("button").contains("Salvar").click();
    cy.get(".alert").contains("Movimentação adicionada com sucesso!");
    cy.visitAndCheck(URL_SEU_BARRIGA, "extrato");
    cy.get("#mes").select("Abril");
    cy.get("#ano").select("2025");
    cy.get('[value="Buscar"]').click();
    checarExtrato(
      movimentacao_obj.descricao,
      movimentacao_obj.data_do_pagamento,
      movimentacao_obj.conta,
      movimentacao_obj.valor,
      movimentacao_obj.situacao
    );
  });
  it("Deve checar o texto do cabeçalho da tabela de extrato (Extra)", () => {
    const textos_cabecalho = [
      "Descrição",
      "Dt Pagamento",
      "Conta",
      "Valor",
      "Situação",
      "Ações",
    ];
    inserirEmailAndSenha(email, senhaPadrao);
    cy.get("button").contains(textBotaoEntrar).click();
    cy.visitAndCheck(URL_SEU_BARRIGA, "extrato");
    textos_cabecalho.forEach((coluna) => {
      cy.get("#tabelaExtrato").contains(coluna);
    });
  });
});
