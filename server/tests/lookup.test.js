import "dotenv/config";

import { describe, expect, it } from "vitest";

import { handler } from "../src/lookup.js";

const TEST_REGISTRATION = "SS2";

describe("lookup integration test", () => {
  it("returns vehicle details for a DVLA test registration", async () => {
    const response = await handler({
      queryStringParameters: { registrationNumber: TEST_REGISTRATION },
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body.data).toBeDefined();
    expect(body.data.registrationNumber).toBeDefined();
  });
});
