
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCard, Lock, Unlock, MoreHorizontal, History } from 'lucide-react';

const VirtualCardManager: React.FC = () => {
  const { cards, createCard, toggleFreezeCard, deleteCard } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateCard = (type: "Mastercard" | "Visa") => {
    createCard(type);
    setIsDialogOpen(false);
  };

  const formatCardNumber = (cardNumber: string) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Virtual Cards</CardTitle>
          <CardDescription>Manage your virtual USD cards</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Card</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new virtual card</DialogTitle>
              <DialogDescription>
                Choose the type of card you want to create. You can create multiple cards for different purposes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button 
                variant="outline" 
                className="h-32 flex flex-col items-center justify-center gap-2 hover:border-nairagreen"
                onClick={() => handleCreateCard("Visa")}
              >
                <div className="text-xl font-bold">Visa</div>
                <div className="text-xs text-muted-foreground">For general online purchases</div>
              </Button>
              <Button 
                variant="outline" 
                className="h-32 flex flex-col items-center justify-center gap-2 hover:border-nairablue"
                onClick={() => handleCreateCard("Mastercard")}
              >
                <div className="text-xl font-bold">Mastercard</div>
                <div className="text-xs text-muted-foreground">Wider international acceptance</div>
              </Button>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="rounded-lg overflow-hidden">
              <div className={`card-gradient p-6 text-white ${card.frozen ? "opacity-70" : ""}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-bold">{card.type}</div>
                  <div className="text-sm">
                    {card.frozen ? <Lock size={16} className="inline mr-1" /> : null}
                    {card.frozen ? "Frozen" : "Active"}
                  </div>
                </div>
                <div className="mb-6 font-medium">{formatCardNumber(card.cardNumber)}</div>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="opacity-70">CARD HOLDER</div>
                    <div>{card.cardHolder}</div>
                  </div>
                  <div>
                    <div className="opacity-70">EXPIRES</div>
                    <div>{card.expiryDate}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 border border-t-0 rounded-b-lg flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <CreditCard size={16} />
                  <span>{formatCardNumber(card.cardNumber)}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toggleFreezeCard(card.id)}>
                      {card.frozen ? (
                        <>
                          <Unlock size={16} className="mr-2" />
                          <span>Unfreeze Card</span>
                        </>
                      ) : (
                        <>
                          <Lock size={16} className="mr-2" />
                          <span>Freeze Card</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <History size={16} className="mr-2" />
                      <span>Transaction History</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => deleteCard(card.id)}
                    >
                      Delete Card
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {cards.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="rounded-full bg-muted p-3">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">No virtual cards</h3>
                <p className="text-sm text-muted-foreground">
                  Create a virtual card to make online payments in USD
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Create Card</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a new virtual card</DialogTitle>
                    <DialogDescription>
                      Choose the type of card you want to create
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <Button 
                      variant="outline" 
                      className="h-32 flex flex-col items-center justify-center gap-2"
                      onClick={() => handleCreateCard("Visa")}
                    >
                      <div className="text-xl font-bold">Visa</div>
                      <div className="text-xs text-muted-foreground">For general online purchases</div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-32 flex flex-col items-center justify-center gap-2"
                      onClick={() => handleCreateCard("Mastercard")}
                    >
                      <div className="text-xl font-bold">Mastercard</div>
                      <div className="text-xs text-muted-foreground">Wider international acceptance</div>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualCardManager;
