import { Given,When, Then } from "@badeball/cypress-cucumber-preprocessor";
Given('User Navigates to Webpage',()=>
{
  cy.visit('https://calculator.net')
})