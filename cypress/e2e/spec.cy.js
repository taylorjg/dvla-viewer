const checkVechicleDetailsItem = (label, value) => {
  cy.findByTestId("vehicle-details").within(() => {
    cy.findByText(label).closest("li, tr").findByText(value);
  });
};

const checkA11y = () => {
  cy.injectAxe();
  cy.checkA11y(null, {
    includedImpacts: ["critical", "serious"],
  });
};

describe("dvla-viewer spec", () => {
  it("shows vehicle details for a valid registration number", () => {
    cy.visit("/");
    checkA11y();
    cy.findByLabelText("Registration Number").type("MC20FLY{enter}");
    checkVechicleDetailsItem("Registration Number", "MC20 FLY");
    checkVechicleDetailsItem("Tax Status", "Taxed");
    checkVechicleDetailsItem("Year Of Manufacture", "2020");
    checkVechicleDetailsItem("Make", "PEUGEOT");
    checkA11y();
  });

  it("shows an error message for an invalid registration number", () => {
    cy.visit("/");
    checkA11y();
    cy.findByLabelText("Registration Number").type("MC20FL{enter}");
    cy.findByRole("alert").within(() => {
      cy.findByText(
        "Invalid format for field - vehicle registration number"
      ).should("exist");
    });
    checkA11y();
  });
});
