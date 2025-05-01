
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Balance, Card, Transaction } from '../types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface WalletContextType {
  balance: Balance;
  transactions: Transaction[];
  cards: Card[];
  isLoading: boolean;
  createCard: (type: "Mastercard" | "Visa") => void;
  toggleFreezeCard: (cardId: string) => void;
  deleteCard: (cardId: string) => void;
  deposit: (amount: number, currency: "USD" | "NGN") => void;
  withdraw: (amount: number, currency: "USD" | "NGN") => void;
}

const mockBalance: Balance = {
  usd: 1250.75,
  ngn: 1875000,
  fxRate: 1500
};

const mockTransactions: Transaction[] = [
  {
    id: "tx_12345",
    type: "deposit",
    amount: 500,
    currency: "USD",
    description: "Deposit via bank transfer",
    date: "2025-04-28T14:32:00Z",
    status: "completed"
  },
  {
    id: "tx_12346",
    type: "card_payment",
    amount: 49.99,
    currency: "USD",
    description: "Netflix Subscription",
    date: "2025-04-26T09:15:00Z",
    status: "completed"
  },
  {
    id: "tx_12347",
    type: "withdrawal",
    amount: 200,
    currency: "USD",
    description: "Withdrawal to bank account",
    date: "2025-04-23T16:40:00Z",
    status: "completed"
  },
  {
    id: "tx_12348",
    type: "card_payment",
    amount: 12.99,
    currency: "USD",
    description: "Spotify Premium",
    date: "2025-04-20T12:05:00Z",
    status: "completed"
  },
  {
    id: "tx_12349",
    type: "deposit",
    amount: 1000,
    currency: "USD",
    description: "Deposit via bank transfer",
    date: "2025-04-15T10:22:00Z",
    status: "completed"
  }
];

const mockCards: Card[] = [
  {
    id: "card_1234",
    cardNumber: "4111 2222 3333 4444",
    expiryDate: "05/28",
    cvv: "123",
    cardHolder: "John Doe",
    type: "Visa",
    frozen: false
  }
];

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<Balance>(mockBalance);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [cards, setCards] = useState<Card[]>(mockCards);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWalletData = async () => {
      if (user) {
        // Simulating API calls to fetch wallet data
        await new Promise(resolve => setTimeout(resolve, 800));
        // In a real app, we'd make API calls here
        setIsLoading(false);
      }
    };

    loadWalletData();
  }, [user]);

  const createCard = (type: "Mastercard" | "Visa") => {
    // Generate random 16-digit card number with spaces every 4 digits
    const generateCardNumber = () => {
      const prefix = type === "Visa" ? "4" : "5";
      let number = prefix;
      for (let i = 0; i < 15; i++) {
        number += Math.floor(Math.random() * 10);
      }
      return number.replace(/(.{4})/g, "$1 ").trim();
    };

    // Generate random 3-digit CVV
    const generateCVV = () => {
      return Math.floor(100 + Math.random() * 900).toString();
    };

    // Generate expiry date 3 years from now
    const generateExpiryDate = () => {
      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = (date.getFullYear() + 3).toString().slice(-2);
      return `${month}/${year}`;
    };

    const newCard: Card = {
      id: `card_${Date.now()}`,
      cardNumber: generateCardNumber(),
      expiryDate: generateExpiryDate(),
      cvv: generateCVV(),
      cardHolder: user?.name || "Card Holder",
      type,
      frozen: false
    };

    setCards(prevCards => [...prevCards, newCard]);
    toast.success(`New ${type} card created successfully!`);
  };

  const toggleFreezeCard = (cardId: string) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, frozen: !card.frozen } : card
      )
    );

    const card = cards.find(c => c.id === cardId);
    if (card) {
      const action = card.frozen ? 'unfrozen' : 'frozen';
      toast.success(`Card ending in ${card.cardNumber.slice(-4)} has been ${action}.`);
    }
  };

  const deleteCard = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    
    if (card) {
      toast.success(`Card ending in ${card.cardNumber.slice(-4)} has been deleted.`);
    }
  };

  const deposit = (amount: number, currency: "USD" | "NGN") => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let usdAmount = amount;
      if (currency === "NGN") {
        usdAmount = amount / balance.fxRate;
      }
      
      const newTransaction: Transaction = {
        id: `tx_${Date.now()}`,
        type: "deposit",
        amount: usdAmount,
        currency: "USD",
        description: "Deposit via bank transfer",
        date: new Date().toISOString(),
        status: "completed"
      };
      
      setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
      setBalance(prevBalance => ({
        ...prevBalance,
        usd: prevBalance.usd + usdAmount,
        ngn: prevBalance.ngn + (usdAmount * prevBalance.fxRate)
      }));
      
      setIsLoading(false);
      toast.success(`Successfully deposited ${currency === 'USD' ? '$' : '₦'}${amount.toLocaleString()}`);
    }, 1500);
  };

  const withdraw = (amount: number, currency: "USD" | "NGN") => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let usdAmount = amount;
      if (currency === "NGN") {
        usdAmount = amount / balance.fxRate;
      }
      
      if (usdAmount > balance.usd) {
        setIsLoading(false);
        toast.error("Insufficient funds");
        return;
      }
      
      const newTransaction: Transaction = {
        id: `tx_${Date.now()}`,
        type: "withdrawal",
        amount: usdAmount,
        currency: "USD",
        description: "Withdrawal to bank account",
        date: new Date().toISOString(),
        status: "completed"
      };
      
      setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
      setBalance(prevBalance => ({
        ...prevBalance,
        usd: prevBalance.usd - usdAmount,
        ngn: prevBalance.ngn - (usdAmount * prevBalance.fxRate)
      }));
      
      setIsLoading(false);
      toast.success(`Successfully withdrew ${currency === 'USD' ? '$' : '₦'}${amount.toLocaleString()}`);
    }, 1500);
  };

  return (
    <WalletContext.Provider value={{
      balance,
      transactions,
      cards,
      isLoading,
      createCard,
      toggleFreezeCard,
      deleteCard,
      deposit,
      withdraw
    }}>
      {children}
    </WalletContext.Provider>
  );
};
