
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/context/WalletContext';

const DashboardHeader: React.FC = () => {
  const { balance } = useWallet();
  const formattedUsdBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(balance.usd);

  const formattedNgnBalance = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(balance.ngn);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your USD savings and virtual cards
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dashboard-card-border">
          <CardContent className="flex flex-col gap-2 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">USD Balance</span>
              <Badge variant="outline" className="bg-nairagreen/10 text-nairagreen">
                USD
              </Badge>
            </div>
            <div className="text-3xl font-bold">{formattedUsdBalance}</div>
            <div className="text-sm text-muted-foreground">
              {formattedNgnBalance} @ ₦{balance.fxRate}/USD
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card-border">
          <CardContent className="flex flex-col gap-2 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Current FX Rate</span>
              <Badge variant="outline" className="bg-nairablue/10 text-nairablue">
                NGN/USD
              </Badge>
            </div>
            <div className="text-3xl font-bold">₦{balance.fxRate.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHeader;
