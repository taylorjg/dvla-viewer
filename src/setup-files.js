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

  // jsdom has no canvas; axe-core calls getContext for color-contrast checks
  HTMLCanvasElement.prototype.getContext = function getContext() {
    return {
      canvas: this,
      font: "",
      textAlign: "left",
      textBaseline: "top",
      fillRect: () => {},
      clearRect: () => {},
      fillText: () => {},
      measureText: () => ({ width: 0 }),
      getImageData: (_x, _y, width, height) => ({
        data: new Uint8ClampedArray(width * height * 4),
      }),
      putImageData: () => {},
      createImageData: (width, height) => ({
        data: new Uint8ClampedArray(width * height * 4),
      }),
      drawImage: () => {},
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      closePath: () => {},
      stroke: () => {},
      fill: () => {},
    };
  };

  // jsdom does not support getComputedStyle with pseudo-elements; axe probes ::before/::after
  const nativeGetComputedStyle = window.getComputedStyle.bind(window);
  window.getComputedStyle = (element, pseudoElement) =>
    nativeGetComputedStyle(element, pseudoElement ? undefined : pseudoElement);
});
