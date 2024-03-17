import { getByText, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import { server } from "@app/mocks/server";

import { App } from "./App";

const API_LOOKUP_PATH =
  "https://jen123ryri.execute-api.us-east-1.amazonaws.com/api/lookup";

const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

const checkVehicleDetailsItem = (label, value) => {
  const vehicleDetails = screen.getByTestId("vehicle-details");
  expect(getByText(vehicleDetails, label)).toBeInTheDocument();
  expect(getByText(vehicleDetails, value)).toBeInTheDocument();
};

describe("App integration tests", () => {
  it("success scenario", async () => {
    // Arrange
    server.use(
      http.get(API_LOOKUP_PATH, ({ request }) => {
        const url = new URL(request.url);
        const registrationNumber = url.searchParams.get("registrationNumber");
        return HttpResponse.json({
          data: {
            registrationNumber,
            colour: "YELLOW",
            make: "PONTIAC",
            fuelType: "PETROL",
          },
        });
      })
    );
    renderApp();

    // Act
    userEvent.type(
      await screen.findByLabelText("Registration Number"),
      "ELV15{enter}"
    );

    // Assert
    expect(await screen.findByTestId("vehicle-details")).toBeInTheDocument();
    checkVehicleDetailsItem("Registration Number", "ELV 15");
    checkVehicleDetailsItem("Colour", "YELLOW");
    checkVehicleDetailsItem("Make", "PONTIAC");
    checkVehicleDetailsItem("Fuel Type", "PETROL");
  });

  it("error scenario", async () => {
    // Arrange
    server.use(
      http.get(API_LOOKUP_PATH, () => {
        return HttpResponse.json(
          { error: "my unit test error" },
          { status: 400 }
        );
      })
    );
    renderApp();

    // Act
    userEvent.type(
      await screen.findByLabelText("Registration Number"),
      "MC20FL{enter}"
    );

    // Assert
    expect(
      within(await screen.findByRole("alert")).getByText("my unit test error")
    ).toBeInTheDocument();
  });
});
