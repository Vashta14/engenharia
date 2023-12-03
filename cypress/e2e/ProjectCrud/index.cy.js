/// <reference types="cypress" />

context("Project crud", () => {
  it("shoud login", () => {
    cy.log("Faz login no sistema");
    cy.visit("/login");
    cy.get("#formBaseemail").type("raulsouzlima@gmail.com");
    cy.get("#formBasepassword").type("12345678");
    cy.get('button[type="submit"]').contains("Entrar").click();
    cy.wait(2000);

    cy.log("Cria um novo projeto");
    cy.get('a[href="/projects"]').click();
    cy.get('button[type="button"]').contains("Criar projeto").click();
    cy.get("#formBasename").type("Projeto Cypress");
    cy.get("#formBasedescription").type("Descrição Cypress");
    cy.get("#formBasegoal").type(30000);
    cy.get("#formBasereward").type("Reconpensa Cypress");
    cy.get('button[type="submit"]').contains("Criar").click();
    cy.wait(2000);

    cy.log("Edita um projeto");
    cy.contains("tr", "Projeto Cypress").within(() => {
      cy.get("button.btn.btn-outline-success").click();
    });
    cy.get("#formBasename").type(" editado");
    cy.get('button[type="submit"]').contains("Editar").click();
    cy.wait(2000);

    cy.log("Deleta um projeto");
    cy.contains("tr", "Projeto Cypress editado").within(() => {
      cy.get("button.btn.btn-outline-success").click();
    });
    cy.get('button[class="btn btn-outline-danger"]').click();
    cy.get("button").contains("Remover").click();
  });
});
