'use client';
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Trash2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Weight,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';
import { toast } from 'sonner';
import { GarbageList } from 'types';

// Mock data for demonstration
const mockEvents = [
  {
    id: 1,
    status: 'pending',
    garbageWeight: '100',
    date: '2025-03-28',
    time: '10:00',
    address: {
      houseNumber: '34',
      street: 'Main Street',
      city: 'Mohali',
      district: 'Mohali',
      state: 'Chhattisgarh',
      pincode: '343434'
    },
    notes: ''
  },
  {
    id: 2,
    status: 'pending',
    garbageWeight: '50',
    date: '2025-03-29',
    time: '09:30',
    address: {
      houseNumber: '42',
      street: 'Park Avenue',
      city: 'Chandigarh',
      district: 'Chandigarh',
      state: 'Punjab',
      pincode: '160022'
    },
    notes: 'Please collect from the back entrance'
  },
  {
    id: 3,
    status: 'accepted',
    garbageWeight: '75',
    date: '2025-03-30',
    time: '14:00',
    address: {
      houseNumber: '8',
      street: 'Sector 17',
      city: 'Chandigarh',
      district: 'Chandigarh',
      state: 'Punjab',
      pincode: '160017'
    },
    notes: 'Heavy items included'
  }
];

const eventsSummary = {
  pending: 5,
  accepted: 3,
  completed: 12
};

const CollectorDasboard = () => {
  const [selectedEvent, setSelectedEvent] = useState<GarbageList | null>(null);
  const [events, setEvents] = useState<GarbageList[]>(mockEvents);

  const handleAccept = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: 'accepted' } : event
      )
    );
    toast('Collection Request Accepted', {
      description: 'You have accepted the garbage collection request',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    });
    setSelectedEvent(null);
  };

  const handleReject = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: 'rejected' } : event
      )
    );
    toast('Collection Request Rejected', {
      description: 'You have rejected the garbage collection request.',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    });
    setSelectedEvent(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge
            variant='outline'
            className='border-yellow-300 bg-yellow-100 text-yellow-800'
          >
            Pending
          </Badge>
        );
      case 'accepted':
        return (
          <Badge
            variant='outline'
            className='border-green-300 bg-green-100 text-green-800'
          >
            Accepted
          </Badge>
        );
      case 'rejected':
        return (
          <Badge
            variant='outline'
            className='border-red-300 bg-red-100 text-red-800'
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant='outline'>Unknown</Badge>;
    }
  };

  return (
    <div className='container mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Upcoming Pickups</CardTitle>
          <CardDescription>
            View and manage garbage collection requests from users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className='font-medium'>{event.id}</TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      <MapPin className='mr-1 h-4 w-4 text-gray-500' />
                      {event.address.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      <Calendar className='mr-1 h-4 w-4 text-gray-500' />
                      {event.date}
                      <Clock className='mr-1 ml-2 h-4 w-4 text-gray-500' />
                      {event.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      <Weight className='mr-1 h-4 w-4 text-gray-500' />
                      {event.garbageWeight} kg
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size='sm'
                          className='cursor-pointer'
                          onClick={() => setSelectedEvent(event)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      {selectedEvent && (
                        <DialogContent className='sm:max-w-md'>
                          <DialogHeader>
                            <DialogTitle className='flex items-center'>
                              <Trash2 className='mr-2 h-5 w-5 text-gray-500' />
                              Collection Request #{selectedEvent.id}
                            </DialogTitle>
                            <DialogDescription>
                              View the details of this garbage collection
                              request
                            </DialogDescription>
                          </DialogHeader>
                          <div className='space-y-4 py-4'>
                            <div className='grid grid-cols-3 gap-4 text-sm'>
                              <div className='font-semibold'>Status:</div>
                              <div className='col-span-2'>
                                {getStatusBadge(selectedEvent.status)}
                              </div>

                              <div className='font-semibold'>Weight:</div>
                              <div className='col-span-2'>
                                {selectedEvent.garbageWeight} kg
                              </div>

                              <div className='font-semibold'>Date:</div>
                              <div className='col-span-2'>
                                {selectedEvent.date}
                              </div>

                              <div className='font-semibold'>Time:</div>
                              <div className='col-span-2'>
                                {selectedEvent.time}
                              </div>

                              <div className='font-semibold'>Address:</div>
                              <div className='col-span-2'>
                                {selectedEvent.address.houseNumber},{' '}
                                {selectedEvent.address.street},
                                {selectedEvent.address.city},{' '}
                                {selectedEvent.address.district},
                                {selectedEvent.address.state},{' '}
                                {selectedEvent.address.pincode}
                              </div>

                              {selectedEvent.notes && (
                                <>
                                  <div className='font-semibold'>Notes:</div>
                                  <div className='col-span-2'>
                                    {selectedEvent.notes}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <DialogFooter className='sm:justify-between'>
                            {selectedEvent.status === 'pending' && (
                              <div className='flex gap-3'>
                                <Button
                                  variant='outline'
                                  onClick={() => handleReject(selectedEvent.id)}
                                  className='flex items-center gap-1'
                                >
                                  <XCircle className='h-4 w-4' />
                                  Reject
                                </Button>
                                <Button
                                  onClick={() => handleAccept(selectedEvent.id)}
                                  className='flex items-center gap-1'
                                >
                                  <CheckCircle className='h-4 w-4' />
                                  Accept
                                </Button>
                              </div>
                            )}
                            {selectedEvent.status !== 'pending' && (
                              <Button
                                variant='outline'
                                onClick={() => setSelectedEvent(null)}
                              >
                                Close
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectorDasboard;
