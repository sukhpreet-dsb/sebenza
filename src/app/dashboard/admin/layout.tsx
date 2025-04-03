'use client';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CollectorForm from '@/features/admin/components/collector-form';
import CollectorsList from '@/features/admin/components/collector-list';
import SummaryCard from '@/features/admin/components/summary-card';
import ZoneManagement from '@/features/admin/components/zone-mangement';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function OverViewLayout({
  pie_stats,
  bar_stats,
  area_stats,
  collector_list
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
  collector_list: React.ReactNode;
}) {
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
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-5'>
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

        <div className='my-8'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-full'
          >
            <TabsList className='mb-8 grid h-full w-full grid-cols-12 gap-2'>
              <TabsTrigger
                value='dashboard'
                className='col-span-6 md:col-span-2'
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value='collectors'
                className='col-span-6 md:col-span-2'
              >
                Collectors
              </TabsTrigger>
              <TabsTrigger value='zones' className='col-span-6 md:col-span-2'>
                Zone Management
              </TabsTrigger>
              <TabsTrigger
                value='analytics'
                className='col-span-6 md:col-span-2'
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger value='school' className='col-span-6 md:col-span-2'>
                School
              </TabsTrigger>
            </TabsList>

            <TabsContent value='dashboard' className='my-4'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Collectors</CardTitle>
                    <CardDescription>
                      Recently added waste collectors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{collector_list}</CardContent>
                </Card>
                {pie_stats}
              </div>
            </TabsContent>

            <TabsContent value='collectors' className='my-4'>
              {showCollectorForm ? (
                <div className='relative flex w-full flex-1'>
                  <Card className='absolute flex w-full flex-col overflow-hidden rounded-lg border py-4'>
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
                </div>
              ) : (
                <div className='relative flex w-full flex-1'>
                  <Card className='absolute flex w-full flex-col overflow-hidden rounded-lg border py-4'>
                    <CardHeader className='flex flex-row items-center justify-between'>
                      <div>
                        <CardTitle>All Collectors</CardTitle>
                        <CardDescription>
                          Manage and assign waste collectors
                        </CardDescription>
                      </div>
                      <Button
                        onClick={handleAddCollector}
                        size='sm'
                        className='cursor-pointer'
                      >
                        <Plus className='mr-2 h-4 w-4' />
                        Add Collector
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <CollectorsList showActions />
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value='zones'>
              <div className='relative flex w-full flex-1'>
                <Card className='absolute w-full flex-col overflow-hidden rounded-lg border py-4'>
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
              </div>
            </TabsContent>

            <TabsContent value='analytics' className='my-4'>
              <div className='grid grid-cols-1 gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Collection Analytics</CardTitle>
                    <CardDescription>
                      Overview of garbage collection data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
                      <div className='col-span-12'>{bar_stats}</div>
                      <div className='col-span-12 md:col-span-12 lg:col-span-4'>
                        {area_stats}
                      </div>
                      <div className='col-span-12 md:col-span-12 lg:col-span-8'>
                        {pie_stats}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value='school' className='my-4'>
              <h1>Comming soon......</h1>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
}
