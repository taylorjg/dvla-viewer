const checkListItem = (label, value) => {
  cy.findByTestId("vehicle-details").within(() => {
    // cy.findByText(label).should("exist");
    // cy.findByText(value).should("exist");
    cy.findByText(label).closest("li").findByText(value);
  });
};

describe("dvla-viewer spec", () => {
  it("successfully shows details for a valid registration number", () => {
    cy.visit("/");
    cy.findByLabelText("Registration Number").type("MC20FLY{enter}");
    checkListItem("Registration Number", "MC20FLY");
    checkListItem("Tax Status", "Taxed");
    checkListItem("Year Of Manufacture", "2020");
    checkListItem("Make", "PEUGEOT");
  });
});
