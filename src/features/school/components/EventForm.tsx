import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Calendar, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

// Define form validation schema
const formSchema = z.object({
  garbageWeight: z
    .string()
    .min(1, { message: 'Approximate weight is required' }),
  date: z.string().min(1, { message: 'Collection date is required' }),
  // time: z.string().min(1, { message: 'Collection time is required' }),
  notes: z.string().optional()
});

type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  address: any;
  onBack: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ address, onBack }) => {
  const [eventCreated, setEventCreated] = useState(false);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      garbageWeight: '',
      date: new Date().toISOString().split('T')[0],
      // time: '10:00',
      notes: ''
    }
  });

  const onSubmit = (data: EventFormValues) => {
    console.log('Event submitted:', data, 'for address:', address);
    setEventCreated(true);
    toast('Collection Request Created', {
      description: 'Your garbage collection request has been submitted.',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full shadow-lg'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-2xl font-bold'>
              Garbage Collection
            </CardTitle>
            <Trash2 className='h-5 w-5 text-gray-500' />
          </div>
          <CardDescription>
            {!eventCreated
              ? 'Please provide details about your garbage collection'
              : 'Your collection request has been submitted'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!eventCreated ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='garbageWeight'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approximate Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='e.g., 5'
                          min='1'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <div className='grid grid-cols-2 gap-4'> */}
                  <FormField
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collection Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name='time'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <FormControl>
                          <Input type='time' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                {/* </div> */}

                <FormField
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Any special instructions for the collector...'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex gap-2 pt-2'>
                  <Button
                    type='button'
                    variant='outline'
                    className='w-1/2 cursor-pointer'
                    onClick={onBack}
                  >
                    Back
                  </Button>
                  <Button type='submit' className='w-1/2 cursor-pointer'>
                    Submit Request
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className='space-y-6'>
              <div className='space-y-2'>
                <h3 className='text-sm font-medium text-gray-500'>Status</h3>
                <div className='flex items-center space-x-3 rounded-md border border-yellow-200 bg-yellow-50 p-3'>
                  <Loader2 className='h-5 w-5 animate-spin text-yellow-500' />
                  <div>
                    <p className='font-medium text-yellow-700'>
                      Awaiting Collector
                    </p>
                    <p className='text-sm text-yellow-600'>
                      Your request is pending acceptance
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-500'>Progress</span>
                  <span className='font-medium'>25%</span>
                </div>
                <Progress value={25} className='h-2' />
              </div>

              <div className='space-y-3'>
                <h3 className='text-sm font-medium text-gray-500'>
                  Collection Details
                </h3>
                <div className='grid grid-cols-2 gap-y-3 text-sm'>
                  <div className='text-gray-500'>Approximate Weight:</div>
                  <div className='font-medium'>
                    {form.getValues().garbageWeight} kg
                  </div>

                  <div className='text-gray-500'>Collection Date:</div>
                  <div className='flex items-center gap-1 font-medium'>
                    <Calendar className='h-3 w-3' />
                    {form.getValues().date}
                  </div>

                  <div className='text-gray-500'>Preferred Time:</div>
                  {/* <div className='font-medium'>{form.getValues().time}</div> */}

                  <div className='text-gray-500'>Address:</div>
                  <div className='font-medium'>
                    {address.houseNumber}, {address.street}, {address.city}
                  </div>
                </div>
              </div>

              <Button onClick={onBack} variant='outline' className='w-full cursor-pointer'>
                Back to Address Form
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventForm;
