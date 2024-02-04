export const partition = (xs, predicate) => {
  const arr1 = [];
  const arr2 = [];

  for (const x of xs) {
    const arr = predicate(x) ? arr1 : arr2;
    arr.push(x);
  }

  return [arr1, arr2];
};
