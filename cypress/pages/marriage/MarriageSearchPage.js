'use strict';

const SearchPage = require('../SearchPage');

class MarriageSearchPage extends SearchPage {

  /**
   * Navigate to marriage registration search page
   */
  static visit() {
    cy.visit('/marriage/search');
  }

  /**
   * Check marriage registrations search page is visible
   */
  static shouldBeVisible() {

    // Has title
    cy.get('h1').contains('Applicant\'s details');

    // Has labels
    cy.get('label[for=system-number]').contains('System number from marriage certificate');
    cy.get('label[for=surname]').contains('Surname');
    cy.get('label[for=forenames]').contains('Forename(s)');
    cy.get('label[for=dom-day]').contains('Day');
    cy.get('label[for=dom-month]').contains('Month');
    cy.get('label[for=dom-year]').contains('Year');
  }

  /**
   * Perform a marriage registration search with the given params
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dom
   */
  static performSearch({
    systemNumber,
    surname,
    forenames,
    dom
  }) {
    this.setText('#system-number', systemNumber);
    this.setText('#surname', surname);
    this.setText('#forenames', forenames);
    this.setText('#dom-day', dom && dom.day);
    this.setText('#dom-month', dom && dom.month);
    this.setText('#dom-year', dom && dom.year);
    this.submit();
  }

  /**
   * Check the search page has the expected values
   *
   * @param systemNumber
   * @param surname
   * @param forenames
   * @param dom
   */
  static hasExpectedValues({
    systemNumber,
    surname,
    forenames,
    dom
  }) {
    cy.get('#system-number').should('have.value', systemNumber);
    cy.get('#surname').should('have.value', surname);
    cy.get('#forenames').should('have.value', forenames);
    cy.get('#dom-day').should('have.value', dom.day);
    cy.get('#dom-month').should('have.value', dom.month);
    cy.get('#dom-year').should('have.value', dom.year);
  }

  static invalidDOMDay() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a day using numbers only');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static invalidDOMMonth() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a month using numbers only');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static invalidDOMYear() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Enter a year using numbers only');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }

  static domInFuture() {
    cy.get('.error-summary').contains('Fix the following error(s)');
    cy.get('.govuk-error-summary__list > li').contains('Please enter a date of marriage in the past');
    cy.get('#dom-error.govuk-error-message').should('exist');
  }
}

module.exports = MarriageSearchPage;
