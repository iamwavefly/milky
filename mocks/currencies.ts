interface CurrencyProps {
  id: number;
  name: string;
  short: string;
}
const currencies: CurrencyProps[] = [
  {
    id: 1,
    name: "NGN",
    short: "NG",
  },
  {
    id: 2,
    name: "USD",
    short: "US",
  },
  {
    id: 3,
    name: "KES",
    short: "KE",
  },
  {
    id: 4,
    name: "CAD",
    short: "CA",
  },
];

export default currencies;
