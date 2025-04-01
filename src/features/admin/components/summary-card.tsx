import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { SummaryCardProps } from 'types';

const SummaryCard = ({ title, value, description }: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-muted-foreground text-sm font-medium'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-muted-foreground mt-1 text-xs'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
