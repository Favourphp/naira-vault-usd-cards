
export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

export interface Card {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
  type: "Mastercard" | "Visa";
  frozen: boolean;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "card_payment";
  amount: number;
  currency: "USD" | "NGN";
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface Balance {
  usd: number;
  ngn: number;
  fxRate: number;
}
