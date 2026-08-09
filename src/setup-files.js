import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import * as axeMatchers from "vitest-axe/matchers";

import { server } from "@app/mocks/server.js";

// Extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);
expect.extend(axeMatchers);

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeAll(() => {
  window.scrollTo = () => {};
});
