import { partition } from "./utils";

describe("utils unit tests", () => {
  describe("partition unit tests", () => {
    it("partition numbers into evens and odds", () => {
      const xs = [1, 2, 3, 4, 5, 6, 7];
      const [evens, odds] = partition(xs, (x) => x % 2 === 0);
      expect(evens).toEqual([2, 4, 6]);
      expect(odds).toEqual([1, 3, 5, 7]);
    });
  });
});
