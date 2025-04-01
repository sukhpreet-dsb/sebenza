'use client';
import React, { useState } from 'react';
import { Home, Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CollectorForm from '@/components/admin/CollectorForm';
import ZoneManagement from '@/components/admin/ZoneManagement';
import CollectionAnalytics from '@/components/admin/CollectionAnalytics';
import { toast } from 'sonner';
import CollectorsList from '@/components/admin/CollectorList';
import Link from 'next/link';

const Main = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCollectorForm, setShowCollectorForm] = useState(false);

  const handleAddCollector = () => {
    setShowCollectorForm(true);
    setActiveTab('collectors');
  };

  const handleCollectorFormSubmit = () => {
    setShowCollectorForm(false);
    toast('Success', {
      description: `Collector added successfully`,
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    });
  };

  const handleCollectorFormCancel = () => {
    setShowCollectorForm(false);
  };

  return (
    <div className='container mx-auto my-10 py-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
          <p className='text-muted-foreground'>
            Manage collectors and view analytics
          </p>
        </div>
        <div className='flex gap-2'>
          <Button asChild variant='outline'>
            <Link href='/' className='flex items-center gap-2'>
              <Home className='h-4 w-4' />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button
            onClick={handleAddCollector}
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' />
            <span>Add Collector</span>
          </Button>
        </div>
      </div>

      <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-5'>
        <SummaryCard title='Total Users' value='80,000' description='users' />
        <SummaryCard
          title='Total Collectors'
          value='24'
          description='Active collectors'
        />
        <SummaryCard
          title='Total Zones'
          value='8'
          description='City districts'
        />
        <SummaryCard
          title='Total Collections'
          value='1,248'
          description='This month'
        />
        <SummaryCard
          title='Total Weight'
          value='2,450 kg'
          description='Garbage collected'
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='mb-8 grid grid-cols-4'>
          <TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
          <TabsTrigger value='collectors'>Collectors</TabsTrigger>
          <TabsTrigger value='zones'>Zone Management</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value='dashboard'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Recent Collectors</CardTitle>
                <CardDescription>
                  Recently added waste collectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CollectorsList limit={5} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Collection by Zone</CardTitle>
                <CardDescription>Garbage collection by zone</CardDescription>
              </CardHeader>
              <CardContent>
                <CollectionAnalytics type='zone' />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='collectors'>
          {showCollectorForm ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Collector</CardTitle>
                <CardDescription>
                  Enter the details of the new waste collector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CollectorForm
                  onSubmit={handleCollectorFormSubmit}
                  onCancel={handleCollectorFormCancel}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                  <CardTitle>All Collectors</CardTitle>
                  <CardDescription>
                    Manage and assign waste collectors
                  </CardDescription>
                </div>
                <Button onClick={handleAddCollector} size='sm'>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Collector
                </Button>
              </CardHeader>
              <CardContent>
                <CollectorsList showActions />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value='zones'>
          <Card>
            <CardHeader>
              <CardTitle>Zone Management</CardTitle>
              <CardDescription>
                Manage city zones and assign collectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ZoneManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='analytics'>
          <div className='grid grid-cols-1 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Collection Analytics</CardTitle>
                <CardDescription>
                  Overview of garbage collection data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CollectionAnalytics type='overview' />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SummaryCard = ({ title, value, description }) => (
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

export default Main;
