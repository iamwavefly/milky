import millify from "millify";

export const DataFormatter = (number: number) => {
  return millify(number);
};

export const accumulator = (arr: [], selector: string) => {
  const sum = arr?.reduce((accumulator, object) => {
    return accumulator + object[selector];
  }, 0);

  return sum;
};

export default accumulator;
