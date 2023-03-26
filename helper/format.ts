import millify from "millify";

export const DataFormatter = (number: number) => {
  // if (number > 1000000000) {
  //   return (number / 1000000000).toString() + "B";
  // } else if (number > 1000000) {
  //   return (number / 1000000).toString() + "M";
  // } else if (number > 1000) {
  //   return (number / 1000).toString() + "K";
  // } else {
  //   return number.toString();
  // }
  return millify(number);
};

export const accumulator = (arr: [], selector: string) => {
  const sum = arr?.reduce((accumulator, object) => {
    return accumulator + object[selector];
  }, 0);

  return sum;
};

export default accumulator;
