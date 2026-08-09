import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { axe } from "vitest-axe";
import { http, HttpResponse } from "msw";

import { server } from "@app/mocks/server";

import { App } from "./app";

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

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

describe("App accessibility", () => {
  it("has no critical or serious axe violations on initial render", async () => {
    const { container } = renderApp();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no critical or serious axe violations after a successful lookup", async () => {
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

    const { container } = renderApp();
    const user = userEvent.setup();

    await user.type(
      await screen.findByLabelText("Registration Number"),
      "ELV15{enter}"
    );

    expect(await screen.findByTestId("vehicle-details")).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no critical or serious axe violations after an error", async () => {
    server.use(
      http.get(API_LOOKUP_PATH, () => {
        return HttpResponse.json(
          { error: "my unit test error" },
          { status: 400 }
        );
      })
    );

    const { container } = renderApp();
    const user = userEvent.setup();

    await user.type(
      await screen.findByLabelText("Registration Number"),
      "MC20FL{enter}"
    );

    expect(
      await screen.findByRole("alert", {}, { timeout: 3000 })
    ).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
