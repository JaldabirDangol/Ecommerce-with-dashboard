'use client';

import React from 'react';
import useSWR from 'swr';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Payment {
  id: string;
  method: string;
  last4: string;
}

export default function BillingSection({ activeTab }: { activeTab: string }) {
  const { data: payments, error, mutate } = useSWR<Payment[]>(
    activeTab === 'billing' ? '/api/payments' : null,
    fetcher
  );

  const handleRemovePayment = async (id: string) => {
    try {
      await fetch(`/api/payments?id=${id}`, { method: 'DELETE' });
      mutate(payments?.filter(p => p.id !== id), { revalidate: false }); // optimistic update
    } catch (err) {
      console.error('Failed to remove payment:', err);
    }
  };

  const handleAddPayment = () => {
    console.log('Add new payment method clicked.');
    // TODO: open modal or navigate to add payment page
  };

  if (activeTab !== 'billing') return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard size={18} /> Payment Methods
          </div>
          <Button onClick={handleAddPayment} className="flex items-center gap-1">
            <Plus size={16} /> Add New
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!payments && !error && <p>Loading payment methods...</p>}
        {error && <p className="text-red-500">Failed to load payment methods.</p>}
        {payments && payments.length === 0 && <p>You have no saved payment methods.</p>}
        {payments && payments.length > 0 && (
          <div className="space-y-2">
            {payments.map(payment => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border rounded-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    {payment.method === 'Visa' && <CreditCard className="w-6 h-6" />}
                    {payment.method} ending in {payment.last4}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemovePayment(payment.id)}
                  aria-label="Remove payment method"
                >
                  <Trash2 size={18} className="text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
