
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import VirtualCardManager from '@/components/VirtualCardManager';
import TransactionHistory from '@/components/TransactionHistory';
import FundingActions from '@/components/FundingActions';

const Dashboard: React.FC = () => {
  return (
    <div className="container py-8 space-y-6">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <VirtualCardManager />
          <TransactionHistory />
        </div>
        
        <div className="space-y-6">
          <FundingActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
