/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.visit("./src/index.html");

    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "teste,teste,teste,teste,teste,teste,teste,teste,teste,teste";
    cy.get("#firstName").type("Jussara");
    cy.get("#lastName").type("SoUSA");
    cy.get("#email").type("jusara.sousa0710@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Jussara");
    cy.get("#lastName").type("SoUSA");
    cy.get("#email").type("jusara.sousa0710@gmail,com");
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo  telefone continua vazio quando preenchido com valor nao numérico", function () {
    cy.get("#phone").type("abcgfdfdf").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Jussara");
    cy.get("#lastName").type("Sousa");
    cy.get("#email").type("jusara.sousa0710@gmail.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });
  it("Preenche e limpa o nome e sobrenome", function () {
    cy.get("#firstName")
      .type("Jussara")
      .should("have.value", "Jussara")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Sousa")
      .should("have.value", "Sousa")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("jusara.sousa0710@gmail.com")
      .should("have.value", "jusara.sousa0710@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("1234567890")
      .should("have.value", "1234567890")
      .clear()
      .should("have.value", "");
  });
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });
  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });
  it("seleciona um produto (Mentoria) por seu valor", function () {
    cy.get("#product").select("Mentoria").should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu indice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });
  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type ="radio"][value="feedback"]').check();
  });
  it("marca o tipo de atendimento", function () {
    cy.get('input[type ="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type ="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo utilizando uma fixture,", function () {
    cy.get('input[type ="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get('input[type ="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type ="file"]')
      .selectFile("@sampleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it.only("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("#privacy a")
    .invoke('removeAttr', 'target')
    .click()

    cy.contains("Talking About Testing").should('be.visible')
  });
});
