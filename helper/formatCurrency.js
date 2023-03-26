const stringToCurrency = (number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(number).replace("$", "NGN");
};

export default stringToCurrency;
