'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pencil, Check, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
// import { useToast } from "@/hooks/use-toast";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  role: z.string(),
  bio: z
    .string()
    .max(500, {
      message: 'Bio must be at most 500 characters.'
    })
    .optional()
});

type FormValues = z.infer<typeof formSchema>;

const Profile = () => {
  // Mock initial user data - in a real app, fetch this from API
  const initialUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    bio: 'Product enthusiast with expertise in UI/UX design and frontend development.',
    profileUrl: ''
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  //   const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      bio: userData.bio
    }
  });

  const onSubmit = (data: FormValues) => {
    setUserData({ ...userData, ...data });
    setIsEditing(false);
    // toast({
    //   title: "Profile updated",
    //   description: "Your profile has been successfully updated.",
    // });
  };

  const handleCancel = () => {
    form.reset({
      name: userData.name,
      email: userData.email,
      role: userData.role,
      bio: userData.bio
    });
    setIsEditing(false);
  };

  return (
    <div className='px-4 py-8'>
      <div className=''>
        {/* <h1 className="text-3xl font-bold mb-6">My Profile</h1> */}

        <div className='mb-8'>
          <Card className='w-full overflow-hidden'>
            <CardHeader>
              <CardTitle className='text-2xl'>Personal Information</CardTitle>
              <CardDescription>
                View and manage your personal information
              </CardDescription>
            </CardHeader>

            <div className='flex flex-col gap-6 p-6 md:flex-row'>
              <div className='flex flex-col items-center gap-4'>
                <div className='relative'>
                  <Avatar className='h-32 w-32'>
                    <AvatarImage src={userData.profileUrl} />
                    <AvatarFallback className='bg-slate-200 text-3xl'>
                      {userData.name
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant='outline'
                    size='icon'
                    className='absolute right-0 bottom-0 rounded-full bg-white shadow-md'
                  >
                    <Camera className='h-4 w-4' />
                  </Button>
                </div>
                <Badge variant='secondary' className='text-sm font-medium'>
                  {userData.role}
                </Badge>
              </div>

              <div className='flex-grow'>
                {isEditing ? (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-4'
                    >
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder='Your name' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder='Your email' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='role'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Your role'
                                {...field}
                                readOnly
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='bio'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Tell us about yourself'
                                className='resize-none'
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className='flex justify-end gap-2 pt-4'>
                        <Button
                          type='button'
                          variant='outline'
                          className='cursor-pointer'
                          onClick={handleCancel}
                        >
                          <X className='mr-2 h-4 w-4' />
                          Cancel
                        </Button>
                        <Button type='submit' className='cursor-pointer'>
                          <Check className='mr-2 h-4 w-4' />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className='space-y-4'>
                    <div className='flex justify-end'>
                      <Button
                        size='sm'
                        onClick={() => setIsEditing(true)}
                        className='cursor-pointer'
                      >
                        <Pencil className='mr-2 h-4 w-4' />
                        Edit Profile
                      </Button>
                    </div>
                    <div className='grid gap-3'>
                      <div>
                        <h3 className='text-muted-foreground text-sm font-medium'>
                          Name
                        </h3>
                        <p className='text-lg'>{userData.name}</p>
                      </div>
                      <div>
                        <h3 className='text-muted-foreground text-sm font-medium'>
                          Email
                        </h3>
                        <p className='text-lg'>{userData.email}</p>
                      </div>
                      <div>
                        <h3 className='text-muted-foreground text-sm font-medium'>
                          Role
                        </h3>
                        <p className='text-lg'>{userData.role}</p>
                      </div>
                      <div>
                        <h3 className='text-muted-foreground text-sm font-medium'>
                          Bio
                        </h3>
                        <p className='text-md'>
                          {userData.bio || 'No bio provided.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
