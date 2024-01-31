import "dotenv/config";

import { handler } from "./lookup";

const main = async () => {
  try {
    const registrationNumber = "WV18UXA";
    const event = {
      queryStringParameters: {
        registrationNumber,
      },
    };
    const result = await handler(event);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

main();
