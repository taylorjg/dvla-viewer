const checkVechicleDetailsItem = (label, value) => {
  cy.findByTestId("vehicle-details").within(() => {
    cy.findByText(label).closest("li").findByText(value);
  });
};

describe("dvla-viewer spec", () => {
  it("shows vehicle details for a valid registration number", () => {
    cy.visit("/");
    cy.findByLabelText("Registration Number").type("MC20FLY{enter}");
    checkVechicleDetailsItem("Registration Number", "MC20FLY");
    checkVechicleDetailsItem("Tax Status", "Taxed");
    checkVechicleDetailsItem("Year Of Manufacture", "2020");
    checkVechicleDetailsItem("Make", "PEUGEOT");
  });

  it("shows an error message for an invalid registration number", () => {
    cy.visit("/");
    cy.findByLabelText("Registration Number").type("MC20FL{enter}");
    cy.findByRole("alert").within(() => {
      cy.findByText(
        "Invalid format for field - vehicle registration number"
      ).should("exist");
    });
  });
});
