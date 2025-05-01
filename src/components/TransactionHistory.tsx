
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/context/WalletContext';
import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/types';

const TransactionHistory: React.FC = () => {
  const { transactions } = useWallet();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTransactionStatusClass = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return '';
    }
  };

  const getTransactionTypeClass = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'text-nairagreen';
      case 'withdrawal':
        return 'text-red-500';
      case 'card_payment':
        return 'text-nairablue';
      default:
        return '';
    }
  };

  const getTransactionTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return '+';
      case 'withdrawal':
      case 'card_payment':
        return '-';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          Your recent transactions across all accounts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="transaction-row flex items-center justify-between p-3 rounded-md"
            >
              <div className="flex items-center space-x-4">
                <div className={`font-medium ${getTransactionTypeClass(transaction.type)}`}>
                  {getTransactionTypeIcon(transaction.type)} ${transaction.amount.toFixed(2)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{transaction.description}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                </div>
              </div>
              <Badge className={`${getTransactionStatusClass(transaction.status)}`}>
                {transaction.status}
              </Badge>
            </div>
          ))}
          
          {transactions.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              No transactions yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
