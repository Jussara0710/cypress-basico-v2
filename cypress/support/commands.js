Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
     cy.get("#firstName").type("Jussara")
     cy.get("#lastName").type("Sousa")
     cy.get("#email").type("jusara.sousa0710@gmail.com")
     cy.get("#open-text-area").type('teste')
     cy.contains("button", "Enviar").click();
})