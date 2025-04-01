import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin } from 'lucide-react';

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  street: z.string().min(3, { message: 'Street address is required' }),
  suburb: z.string().min(3, { message: 'Suburb address is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  postal_code: z
    .string()
    .length(6, { message: 'Postal Code must be 4 digits' })
    .regex(/^\d+$/, { message: 'Postal Code must contain only numbers' }),
  country: z.string().min(3, { message: 'Country is required' })
});

export type AddressFormValues = z.infer<typeof formSchema>;

interface AddressFormProps {
  onAddressSubmit: (address: AddressFormValues) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddressSubmit }) => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      street: '',
      suburb: '',
      province: '',
      city: '',
      postal_code: '',
      country:'South Africa'
    }
  });

  const onSubmit = (data: AddressFormValues) => {
    console.log('Form submitted:', data);
    toast('Address Saved', {
      description: 'Your address has been successfully saved',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    });
    onAddressSubmit(data);
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full shadow-lg'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-2xl font-bold'>
              Address Details
            </CardTitle>
            <MapPin className='h-5 w-5 text-gray-500' />
          </div>
          <CardDescription>
            Please fill in your complete address information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder='John smith' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='street'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., 123 Main road' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='suburb'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suburb/Locality</FormLabel>
                      <FormControl>
                        <Input placeholder='Bryanston' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., Johannesburg' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='province'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., Eastern Cape (EC),Free State (FS)'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='postal_code'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., 2196' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='country'
                disabled={true}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='mt-6 w-full cursor-pointer'>
                Continue to Event Details
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressForm;
