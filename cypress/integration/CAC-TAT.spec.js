/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.visit("./src/index.html");

    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it.only("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "teste,teste,teste,teste,teste,teste,teste,teste,teste,teste";
    cy.get("#firstName").type("Jussara");
    cy.get("#lastName").type("SoUSA");
    cy.get("#email").type("jusara.sousa0710@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  it.only("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Jussara");
    cy.get("#lastName").type("SoUSA");
    cy.get("#email").type("jusara.sousa0710@gmail,com");
    cy.get("#open-text-area").type("teste");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
});
