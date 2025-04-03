'use client';
import React, { useState, useEffect } from 'react';
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
import { Calendar, MapPin, Weight, Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { GarbageList } from 'types';
import CollectionDetailsDialog from './collection-detail-dialog';

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
  },
  {
    id: 4,
    status: 'completed',
    garbageWeight: '120',
    date: '2025-03-27',
    time: '11:30',
    address: {
      houseNumber: '15',
      street: 'Sector 22',
      city: 'Chandigarh',
      district: 'Chandigarh',
      state: 'Punjab',
      pincode: '160022'
    },
    notes: 'Regular pickup'
  },
  {
    id: 5,
    status: 'rejected',
    garbageWeight: '40',
    date: '2025-03-26',
    time: '16:00',
    address: {
      houseNumber: '67',
      street: 'MG Road',
      city: 'Panchkula',
      district: 'Panchkula',
      state: 'Haryana',
      pincode: '134109'
    },
    notes: 'Hazardous materials included'
  }
];

const CollectorDashboard = () => {
  const [events] = useState<GarbageList[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  // Filter events based on search term and status filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.id.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' || event.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  // const handleAccept = (id: number) => {
  //   setEvents(
  //     events.map((event) =>
  //       event.id === id ? { ...event, status: 'accepted' } : event
  //     )
  //   );
  //   toast('Collection Request Accepted', {
  //     description: 'You have accepted the garbage collection request',
  //     action: {
  //       label: 'Undo',
  //       onClick: () => console.log('Undo')
  //     }
  //   });
  //   setSelectedEvent(null);
  // };

  // const handleReject = (id: number) => {
  //   setEvents(
  //     events.map((event) =>
  //       event.id === id ? { ...event, status: 'rejected' } : event
  //     )
  //   );
  //   toast('Collection Request Rejected', {
  //     description: 'You have rejected the garbage collection request.',
  //     action: {
  //       label: 'Undo',
  //       onClick: () => console.log('Undo')
  //     }
  //   });
  //   setSelectedEvent(null);
  // };

  // const handleSaveGarbageType = () => {
  //   if (!selectedGarbageType) {
  //     toast('Please select a garbage type', {
  //       description: 'You need to select a garbage type before saving'
  //     });
  //     return;
  //   }

  //   setEvents(
  //     events.map((event) =>
  //       event.id === selectedEvent?.id
  //         ? { ...event, garbageType: selectedGarbageType }
  //         : event
  //     )
  //   );

  //   toast('Garbage Type Saved', {
  //     description: `Garbage type set to ${selectedGarbageType}`,
  //     action: {
  //       label: 'Undo',
  //       onClick: () => console.log('Undo')
  //     }
  //   });

  //   setSelectedEvent(null);
  //   setSelectedGarbageType('');
  // };

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
      case 'completed':
        return (
          <Badge
            variant='outline'
            className='border-blue-300 bg-blue-100 text-blue-800'
          >
            Completed
          </Badge>
        );
      default:
        return <Badge variant='outline'>Unknown</Badge>;
    }
  };

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  return (
    <div className='flex flex-1 flex-col'>
      <div className='relative flex w-full flex-1'>
        <Card className='absolute flex w-full flex-col overflow-hidden rounded-lg border py-4'>
          <CardHeader>
            <CardTitle className='text-xl'>Upcoming Pickups</CardTitle>
            <CardDescription>
              View and manage garbage collection requests from users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='mb-6 flex flex-col gap-4 md:flex-row'>
              <div className='relative flex-1'>
                <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
                <Input
                  placeholder='Search by location or ID...'
                  className='pl-8'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='w-full md:w-48'>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className='w-full'>
                    <div className='flex items-center'>
                      <Filter className='mr-2 h-4 w-4' />
                      <SelectValue placeholder='Filter by status' />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Statuses</SelectItem>
                    <SelectItem value='pending'>Pending</SelectItem>
                    <SelectItem value='accepted'>Accepted</SelectItem>
                    <SelectItem value='rejected'>Rejected</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                {currentItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-muted-foreground py-6 text-center'
                    >
                      No collection requests found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((event) => (
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
                        <CollectionDetailsDialog
                          event={event}
                          getStatusBadge={getStatusBadge}
                        />
                        {/* <Dialog>
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
                                  Manage recyclable items for this collection
                                </DialogDescription>
                              </DialogHeader>
                              <div className='space-y-4 py-4'>
                                <div className='grid grid-cols-3 gap-4 text-sm'>
                                  <div className='font-semibold'>Status:</div>
                                  <div className='col-span-2'>
                                    {getStatusBadge(selectedEvent.status)}
                                  </div>

                                  <div className='font-semibold'>Address:</div>
                                  <div className='col-span-2'>
                                    {selectedEvent.address.houseNumber},{' '}
                                    {selectedEvent.address.street},{' '}
                                    {selectedEvent.address.city},{' '}
                                    {selectedEvent.address.district},{' '}
                                    {selectedEvent.address.state},{' '}
                                    {selectedEvent.address.pincode}
                                  </div>

                                  <div className='font-semibold'>
                                    Waste Type:
                                  </div>
                                  <div className='col-span-2'>
                                    <Select
                                      value={selectedGarbageType}
                                      onValueChange={setSelectedGarbageType}
                                    >
                                      <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Select waste type' />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value='PET bottles'>
                                          PET bottles
                                        </SelectItem>
                                        <SelectItem value='Aluminium cans'>
                                          Aluminium cans
                                        </SelectItem>
                                        <SelectItem value='Paper'>
                                          Paper
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter className='sm:justify-between'>
                                <Button
                                  onClick={handleSaveGarbageType}
                                  className='flex items-center gap-1'
                                >
                                  <Save className='h-4 w-4' />
                                  Save
                                </Button>
                                <Button
                                  variant='outline'
                                  onClick={() => {
                                    setSelectedEvent(null);
                                    setSelectedGarbageType('');
                                  }}
                                >
                                  Close
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog> */}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {filteredEvents.length > 0 && (
              <div className='mt-6'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          currentPage > 1 && goToPage(currentPage - 1)
                        }
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => goToPage(page)}
                            isActive={currentPage === page}
                            className='cursor-pointer'
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          currentPage < totalPages && goToPage(currentPage + 1)
                        }
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <div className='text-muted-foreground mt-2 text-center text-sm'>
                  Showing {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredEvents.length)} of{' '}
                  {filteredEvents.length} items
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectorDashboard;
