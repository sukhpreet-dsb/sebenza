'use client';
import React, { useState } from 'react';
import EventForm from './EventForm';
import {
  Handshake,
  Trophy
} from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import AddressForm, { AddressFormValues } from './AddressForm';;

const Index = () => {
  const [addressData, setAddressData] = useState<AddressFormValues | null>(
    null
  );
  const [step, setStep] = useState<'address' | 'event'>('address');

  const handleAddressSubmit = (data: AddressFormValues) => {
    setAddressData(data);
    setStep('event');
  };

  const handleBackToAddress = () => {
    setStep('address');
  };

  return (
    <>
      {/* rewards Cards */}
      <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-2'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex text-[20px]'>
              <Trophy className='mr-2 h-8 w-8 text-amber-500' />
              Your Rewards
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              300
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='text-muted-foreground'>Awaiting your reward</div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex text-[20px]'>
              <Handshake className='mr-2 h-8 w-8 text-green-500' />
              Your Contribution
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              31
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='text-muted-foreground'>
              Successfully Contributed
            </div>
          </CardFooter>
        </Card>
      </div>
      {step === 'address' ? (
        <AddressForm onAddressSubmit={handleAddressSubmit} />
      ) : (
        <EventForm address={addressData} onBack={handleBackToAddress} />
      )}
      {/* <Main /> */}
    </>
  );
};

export default Index;
