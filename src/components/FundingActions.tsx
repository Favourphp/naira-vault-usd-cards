
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useWallet } from '@/context/WalletContext';
import { Download, Upload } from 'lucide-react';

const FundingActions: React.FC = () => {
  const { balance, deposit, withdraw } = useWallet();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [depositCurrency, setDepositCurrency] = useState<"USD" | "NGN">("NGN");
  const [withdrawCurrency, setWithdrawCurrency] = useState<"USD" | "NGN">("NGN");
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

  const handleDeposit = () => {
    if (depositAmount <= 0) return;
    deposit(depositAmount, depositCurrency);
    setDepositAmount(0);
    setIsDepositDialogOpen(false);
  };

  const handleWithdraw = () => {
    if (withdrawAmount <= 0) return;
    withdraw(withdrawAmount, withdrawCurrency);
    setWithdrawAmount(0);
    setIsWithdrawDialogOpen(false);
  };

  const displayDepositEquivalent = () => {
    if (depositCurrency === "USD") {
      return `≈ ₦${(depositAmount * balance.fxRate).toLocaleString()}`;
    } else {
      return `≈ $${(depositAmount / balance.fxRate).toFixed(2)}`;
    }
  };

  const displayWithdrawEquivalent = () => {
    if (withdrawCurrency === "USD") {
      return `≈ ₦${(withdrawAmount * balance.fxRate).toLocaleString()}`;
    } else {
      return `≈ $${(withdrawAmount / balance.fxRate).toFixed(2)}`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funding</CardTitle>
        <CardDescription>
          Deposit funds to or withdraw from your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Upload className="h-6 w-6 text-nairagreen" />
                <span className="font-medium">Deposit</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deposit Funds</DialogTitle>
                <DialogDescription>
                  Add funds to your NairaLock account
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="ngn" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger 
                    value="ngn" 
                    onClick={() => setDepositCurrency("NGN")}
                    className={depositCurrency === "NGN" ? "font-medium" : ""}
                  >
                    Nigerian Naira (₦)
                  </TabsTrigger>
                  <TabsTrigger 
                    value="usd" 
                    onClick={() => setDepositCurrency("USD")}
                    className={depositCurrency === "USD" ? "font-medium" : ""}
                  >
                    US Dollar ($)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ngn" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount to Deposit</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">₦</span>
                      </div>
                      <Input 
                        type="number" 
                        placeholder="Enter amount" 
                        className="pl-7" 
                        value={depositAmount || ''}
                        onChange={e => setDepositAmount(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-right">
                      {depositAmount ? displayDepositEquivalent() : ''}
                    </p>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <p className="text-sm">
                      Current exchange rate: <strong>₦{balance.fxRate.toLocaleString()}/USD</strong>
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="usd" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount to Deposit</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input 
                        type="number" 
                        placeholder="Enter amount" 
                        className="pl-7" 
                        value={depositAmount || ''}
                        onChange={e => setDepositAmount(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-right">
                      {depositAmount ? displayDepositEquivalent() : ''}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDeposit} disabled={depositAmount <= 0}>
                  Deposit Funds
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Download className="h-6 w-6 text-nairablue" />
                <span className="font-medium">Withdraw</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw Funds</DialogTitle>
                <DialogDescription>
                  Withdraw funds from your NairaLock account
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="ngn" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger 
                    value="ngn" 
                    onClick={() => setWithdrawCurrency("NGN")}
                    className={withdrawCurrency === "NGN" ? "font-medium" : ""}
                  >
                    Nigerian Naira (₦)
                  </TabsTrigger>
                  <TabsTrigger 
                    value="usd" 
                    onClick={() => setWithdrawCurrency("USD")}
                    className={withdrawCurrency === "USD" ? "font-medium" : ""}
                  >
                    US Dollar ($)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ngn" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount to Withdraw</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">₦</span>
                      </div>
                      <Input 
                        type="number" 
                        placeholder="Enter amount" 
                        className="pl-7" 
                        value={withdrawAmount || ''}
                        onChange={e => setWithdrawAmount(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-right">
                      {withdrawAmount ? displayWithdrawEquivalent() : ''}
                    </p>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <p className="text-sm">
                      Available: <strong>${balance.usd.toFixed(2)}</strong> (₦{balance.ngn.toLocaleString()})
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="usd" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount to Withdraw</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input 
                        type="number" 
                        placeholder="Enter amount" 
                        className="pl-7" 
                        value={withdrawAmount || ''}
                        onChange={e => setWithdrawAmount(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-right">
                      {withdrawAmount ? displayWithdrawEquivalent() : ''}
                    </p>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <p className="text-sm">
                      Available: <strong>${balance.usd.toFixed(2)}</strong>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleWithdraw} disabled={withdrawAmount <= 0}>
                  Withdraw Funds
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundingActions;
