import React, { useState } from 'react';
import { Trash2, Edit, MapPin } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import CollectorForm from './CollectorForm';

// Mock collector data
const MOCK_COLLECTORS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 555-123-4567',
    zone: 'North District',
    status: 'active',
    collectionsCompleted: 45,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 555-987-6543',
    zone: 'South District',
    status: 'active',
    collectionsCompleted: 32,
    joinedDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '+1 555-456-7890',
    zone: 'East District',
    status: 'inactive',
    collectionsCompleted: 18,
    joinedDate: '2023-03-10'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 555-789-0123',
    zone: 'West District',
    status: 'active',
    collectionsCompleted: 27,
    joinedDate: '2023-04-05'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    phone: '+1 555-234-5678',
    zone: 'Central District',
    status: 'on-leave',
    collectionsCompleted: 15,
    joinedDate: '2023-05-12'
  }
];

interface CollectorsListProps {
  limit?: number;
  showActions?: boolean;
}

const CollectorsList = ({
  limit,
  showActions = false
}: CollectorsListProps) => {
  const [collectors, setCollectors] = useState(MOCK_COLLECTORS);
  const [selectedCollector, setSelectedCollector] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const displayedCollectors = limit ? collectors.slice(0, limit) : collectors;

  const handleEdit = (collector) => {
    setSelectedCollector(collector);
    setShowEditDialog(true);
    // In a real app, this would open an edit form

    toast('Edit Collector', {
      description: `Editing ${collector.name}'s information`,
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    });
  };

  const handleDelete = (collector) => {
    setSelectedCollector(collector);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedCollector) {
      setCollectors(collectors.filter((c) => c.id !== selectedCollector.id));
      toast('Collector Deleted', {
        description: `${selectedZone.name} has been removed`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      });
      setShowDeleteDialog(false);
      setSelectedCollector(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant='default'>Active</Badge>;
      case 'inactive':
        return <Badge variant='secondary'>Inactive</Badge>;
      case 'on-leave':
        return <Badge variant='outline'>On Leave</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const handleEditFormSubmit = () => {
    // In a real app, this would update the collector's data

    toast('Collector Updated', {
      description: `${selectedCollector.name}'s information has been updated`,
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    });
    setShowEditDialog(false);
    setSelectedCollector(null);
  };

  const handleEditFormCancel = () => {
    setShowEditDialog(false);
    setSelectedCollector(null);
  };

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Collections</TableHead>
              {showActions && (
                <TableHead className='text-right'>Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCollectors.map((collector) => (
              <TableRow key={collector.id}>
                <TableCell className='font-medium'>
                  <div>{collector.name}</div>
                  <div className='text-muted-foreground text-xs'>
                    {collector.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-1'>
                    <MapPin className='text-muted-foreground h-3 w-3' />
                    {collector.zone}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(collector.status)}</TableCell>
                <TableCell>{collector.collectionsCompleted}</TableCell>
                {showActions && (
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEdit(collector)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDelete(collector)}
                      >
                        <Trash2 className='text-destructive h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Collector</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCollector?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className='sm:max-w-md md:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Edit Collector</DialogTitle>
            <DialogDescription>
              Update the collector's information
            </DialogDescription>
          </DialogHeader>
          {selectedCollector && (
            <CollectorForm
              onSubmit={handleEditFormSubmit}
              onCancel={handleEditFormCancel}
              defaultValues={selectedCollector}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CollectorsList;
