import { faker } from "@faker-js/faker";

export const _businesses = [
  {
    id: "AP00000001",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    country: faker.address.country(),
    contact: faker.name.fullName(),
    date: "12/03/2023",
    status: "In Review",
  },
  {
    id: "AP00000002",
    name: "Vicky stores",
    email: "victorstores@gmail.com",
    country: faker.address.country(),
    contact: "Victoria Okorefe",
    date: "12/03/2023",
    status: "Approved",
  },
  {
    id: "AP00000003",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    country: faker.address.country(),
    contact: faker.name.fullName(),
    date: "12/03/2023",
    status: "Rejected",
  },
  {
    id: "AP00000003",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    country: faker.address.country(),
    contact: faker.name.fullName(),
    date: "12/03/2023",
    status: "Approved",
  },
  {
    id: "AP00000003",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    country: faker.address.country(),
    contact: faker.name.fullName(),
    date: "12/03/2023",
    status: "Pending review",
  },
  {
    id: "AP00000003",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    country: faker.address.country(),
    contact: faker.name.fullName(),
    date: "12/03/2023",
    status: "Pending review",
  },
  {
    id: "AP00000003",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    country: faker.address.country(),
    contact: faker.name.fullName(),
    date: "12/03/2023",
    status: "Rejected",
  },
  {
    id: "AP00000003",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    country: faker.address.country(),
    contact: faker.name.fullName(),
    date: "12/03/2023",
    status: "Rejected",
  },
  {
    id: "AP00000003",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    country: faker.address.country(),
    contact: faker.name.fullName(),
    date: "12/03/2023",
    status: "Approved",
  },
];
export const _transactions = [
  {
    id: "AP00000001",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    payment: "card",
    amount: "N100,250,000",
    date: "12/03/2023",
    status: "processing",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    payment: "card",
    amount: "N100,250,000",
    date: "12/03/2023",
    status: "decline",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    payment: "card",
    amount: "N100,250,000",
    date: "12/03/2023",
    status: "processing",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    payment: "card",
    amount: "N100,250,000",
    date: "12/03/2023",
    status: "completed",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    payment: "card",
    amount: "N100,250,000",
    date: "12/03/2023",
    status: "decline",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    payment: "card",
    amount: "N100,250,000",
    date: "12/03/2023",
    status: "completed",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    payment: "card",
    amount: "N100,250,000",
    date: "12/03/2023",
    status: "processing",
  },
];

export const _settlement = [
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",
    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",
    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",

    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",

    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",

    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",

    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",

    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",

    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",
    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",
    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
  {
    id: "AP00000001",
    name: faker.company.name(),
    destination: "1234567890 - First bank",
    amount: "N100,250,000",
    date: "12/04/2022",
    status: "due",
  },
];

export const _customers = [
  {
    id: "AP00000001",
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    mobile_number: "+2348101234567",
    country: faker.address.country(),
    status: "completed",
    count: 200,
  },
  {
    id: "AP00000002",
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    mobile_number: "+2348101234567",
    country: faker.address.country(),
    status: "completed",
    count: 860,
  },
  {
    id: "AP00000003",
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    mobile_number: "+2348101234567",
    country: "Canada",
    status: "completed",
    count: 1260,
  },
  {
    id: "AP00000004",
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    mobile_number: "+2348101234567",
    country: "China",
    status: "Pending review",
    count: 960,
  },
];

export const _invoices = [
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    invoice_number: "AP00000001",
    amount: "N100,250,000",
    date_issued: "12/04/2022",
    due_date: "12/04/2022",
    status: "Completed",
  },
  {
    name: "John stores",
    email_address: "johndoe@gmail.com",
    invoice_number: "AP00000002",
    amount: "N100,250,000",
    date_issued: "12/04/2022",
    due_date: "12/04/2022",
    status: "Completed",
  },
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    invoice_number: "AP00000003",
    amount: "N100,250,000",
    date_issued: "12/04/2022",
    due_date: "12/04/2022",
    status: "Rejected",
  },
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    invoice_number: "AP00000004",
    amount: "N100,250,000",
    date_issued: "12/04/2022",
    due_date: "12/04/2022",
    status: "Completed",
  },
  {
    name: faker.company.name(),
    email_address: "man@gmail.com",
    invoice_number: "AP00000005",
    amount: "N100,250,000",
    date_issued: "12/04/2022",
    due_date: "12/04/2022",
    status: "In Review",
  },
];

export const _review = [
  {
    name: faker.company.name(),
    destination: "1234567890 - First bank",
    merchant_id: "AP00000001",
    amount: "N100,250,000",
    date: "12/04/2022",
    status: "Completed",
  },
  {
    name: "John stores",
    destination: "1234567890 - First bank",
    merchant_id: "AP00000001",
    amount: "N100,250,000",
    date: "12/04/2022",
    status: "Completed",
  },
  {
    name: "Emmax stores",
    destination: "1234567890 - First bank",
    merchant_id: "AP00000001",
    amount: "N100,250,000",
    date: "12/04/2022",
    status: "Failed",
  },
];

export const _accounts = [
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    type: faker.company.bsBuzz(),
    country: faker.address.country(),
    subsidiaries: 4,
  },
  {
    name: "Smart IT",
    email_address: "smartit@gmail.com",
    type: "Business",
    country: faker.address.country(),
    subsidiaries: 12,
  },
];

export const _accountSubsidiaries = [
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    type: faker.company.bsBuzz(),
    country: faker.address.country(),
    users: 14,
    subsidiaries: 4,
  },
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    type: faker.company.bsBuzz(),
    country: faker.address.country(),
    users: 22,
    subsidiaries: 8,
  },
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    type: faker.company.bsBuzz(),
    country: faker.address.country(),
    users: 14,
    subsidiaries: 4,
  },
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    type: faker.company.bsBuzz(),
    country: faker.address.country(),
    users: 14,
    subsidiaries: 4,
  },
  {
    name: faker.company.name(),
    email_address: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    type: faker.company.bsBuzz(),
    country: faker.address.country(),
    users: 14,
    subsidiaries: 4,
  },
];

export const _accountSettlements = [
  {
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    fee: `N${faker.commerce.price()}`,
    currency: `Naira`,
    cycle: "T + 1 (1 day after transaction)",
    status: "Settled",
  },
  {
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    fee: `N${faker.commerce.price()}`,
    currency: `Naira`,
    cycle: "T + 1 (1 day after transaction)",
    status: "Settled",
  },
  {
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    fee: `N${faker.commerce.price()}`,
    currency: `Naira`,
    cycle: "T + 1 (1 day after transaction)",
    status: "Settled",
  },
  {
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    fee: `N${faker.commerce.price()}`,
    currency: `Naira`,
    cycle: "T + 1 (1 day after transaction)",
    status: "Settled",
  },
  {
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    fee: `N${faker.commerce.price()}`,
    currency: `Naira`,
    cycle: "T + 1 (1 day after transaction)",
    status: "Settled",
  },
  {
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    fee: `N${faker.commerce.price()}`,
    currency: `Naira`,
    cycle: "T + 1 (1 day after transaction)",
    status: "Settled",
  },
];

export const _payoutCredit = [
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    reference: faker.random.words(),
    date: "12/04/2022",
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    reference: faker.random.words(),
    date: "12/04/2022",
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    reference: faker.random.words(),
    date: "12/04/2022",
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    reference: faker.random.words(),
    date: "12/04/2022",
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    reference: faker.random.words(),
    date: "12/04/2022",
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    reference: faker.random.words(),
    date: "12/04/2022",
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    reference: faker.random.words(),
    date: "12/04/2022",
  },
];

export const _main = [
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    id: "AP00000001",
    card_type: "Mastercard",
    MID: "WMAARC001",
    bank: "Zenith",
    payment: "card",
    amount: `N${faker.commerce.price()}`,
    amount_charged: `N${faker.commerce.price()}`,
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    role: "Admin",
    currency: `Naira`,
    status: "completed",
    date: "12/04/2022",
    debit_type: "Refund",
    due_date: "12/04/2022",
    transaction_ref: faker.random.words(),
    country: faker.address.country(),
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    reference: faker.random.words(),
    id: "AP00000001",
    role: "Admin",
    card_type: "Mastercard",
    MID: "WMAARC002",
    bank: "Zenith",
    payment: "card",
    amount_charged: `N${faker.commerce.price()}`,
    currency: `Naira`,
    status: "completed",
    date: "12/04/2022",
    debit_type: "Settlement reversal",
    due_date: "12/04/2022",
    transaction_ref: faker.random.words(),
    country: faker.address.country(),
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    reference: faker.random.words(),
    id: "AP00000001",
    role: "Admin",
    bank: "GTBank",
    card_type: "Verve",
    MID: "WMAARC003",
    payment: "card",
    amount_charged: `N${faker.commerce.price()}`,
    currency: `Naira`,
    status: "completed",
    date: "12/04/2022",
    debit_type: "Chargeback",
    due_date: "12/04/2022",
    transaction_ref: faker.random.words(),
    country: faker.address.country(),
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    amount_charged: `N${faker.commerce.price()}`,
    currency: `Naira`,
    card_type: "Verve",
    MID: "WMAARC002",
    id: "AP00000001",
    bank: "Zenith",
    role: "Admin",
    payment: "card",
    reference: faker.random.words(),
    date: "12/04/2022",
    debit_type: "Transfers",
    status: "Completed",
    country: faker.address.country(),
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    id: "AP00000001",
    amount: `N${faker.commerce.price()}`,
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    reference: faker.random.words(),
    currency: `Naira`,
    payment: "card",
    card_type: "Mastercard",
    MID: "WMAARC002",
    bank: "Zenith",
    role: "Editor",
    date: "12/04/2022",
    debit_type: "Transfers",
    status: "Completed",
    due_date: "12/04/2022",
    transaction_ref: faker.random.words(),
    country: faker.address.country(),
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    amount: `N${faker.commerce.price()}`,
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    id: "AP00000001",
    currency: `Naira`,
    payment: "card",
    card_type: "Mastercard",
    MID: "WMAARC002",
    bank: "Zenith",
    reference: faker.random.words(),
    date: "12/04/2022",
    role: "Admin",
    debit_type: "Transfers",
    amount_charged: `N${faker.commerce.price()}`,
    status: "completed",
    due_date: "12/04/2022",
    transaction_ref: faker.random.words(),
    country: faker.address.country(),
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    id: "AP00000001",
    currency: `Naira`,
    payment: "card",
    card_type: "Mastercard",
    MID: "WMAARC002",
    bank: "First bank",
    role: "Viewer",
    amount: `N${faker.commerce.price()}`,
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    amount_charged: `N${faker.commerce.price()}`,
    status: "completed",
    date: "12/04/2022",
    due_date: "12/04/2022",
    transaction_ref: faker.random.words(),
    country: faker.address.country(),
  },
  {
    type: faker.company.bsBuzz(),
    name: faker.company.name(),
    currency: `Naira`,
    card_type: "Mastercard",
    MID: "WMAARC002",
    bank: "Sterling bank",
    status: "completed",
    role: "Editor",
    amount: `N${faker.commerce.price()}`,
    email: `${faker.company.name()?.replaceAll(" ", "")}@gmail.com`,
    amount_charged: `N${faker.commerce.price()}`,
    id: "AP00000001",
    date: "12/04/2022",
    debit_type: "Transfers",
    due_date: "12/04/2022",
    transaction_ref: faker.random.words(),
    country: faker.address.country(),
  },
];

// roles
export const roles = [
  {
    id: 1,
    account: 2,
    role: "Super Admin",
  },
  {
    id: 2,
    account: 12,
    role: "Admin",
  },
  {
    id: 3,
    account: 6,
    role: "Editor",
  },
  {
    id: 3,
    account: 6,
    role: "Editor",
  },
  {
    id: 3,
    account: 6,
    role: "Editor",
  },
  {
    id: 3,
    account: 6,
    role: "Editor",
  },
  {
    id: 3,
    account: 6,
    role: "Editor",
  },
  {
    id: 3,
    account: 6,
    role: "Editor",
  },
];

// roles
export const paymentMethod = [
  {
    id: 1,
    name: "Card",
  },
  {
    id: 2,
    name: "Account",
  },
  {
    id: 3,
    name: "QR code",
  },
  {
    id: 4,
    name: "USSD",
  },
];
// roles
export const cardtype = [
  {
    id: 1,
    name: "Mastercard",
  },
  {
    id: 2,
    name: "VISA",
  },
  {
    id: 3,
    name: "Verve",
  },
  {
    id: 4,
    name: "Default",
  },
];
// roles
export const banks = [
  {
    id: 1,
    name: "First bank",
  },
  {
    id: 2,
    name: "Zenith bank",
  },
  {
    id: 3,
    name: "UBA",
  },
  {
    id: 4,
    name: "Polaris bank",
  },
];