import React, { useState } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// Mock zone data
const MOCK_ZONES = [
  {
    id: '1',
    name: 'North District',
    collectors: 5,
    requests: 12,
    completed: 45,
    utilization: 75
  },
  {
    id: '2',
    name: 'South District',
    collectors: 4,
    requests: 8,
    completed: 32,
    utilization: 60
  },
  {
    id: '3',
    name: 'East District',
    collectors: 3,
    requests: 15,
    completed: 18,
    utilization: 90
  },
  {
    id: '4',
    name: 'West District',
    collectors: 6,
    requests: 10,
    completed: 27,
    utilization: 50
  },
  {
    id: '5',
    name: 'Central District',
    collectors: 2,
    requests: 20,
    completed: 15,
    utilization: 95
  }
];

const ZoneManagement = () => {
  const [zones, setZones] = useState(MOCK_ZONES);
  const [showAddZoneDialog, setShowAddZoneDialog] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleAddZone = () => {
    if (newZoneName.trim()) {
      const newZone = {
        id: `${zones.length + 1}`,
        name: newZoneName,
        collectors: 0,
        requests: 0,
        completed: 0,
        utilization: 0
      };
      setZones([...zones, newZone]);
      setNewZoneName('');
      setShowAddZoneDialog(false);
      toast('Zone Added', {
        description: `description: ${newZoneName} has been added successfully`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      });
    }
  };

  const handleDelete = (zone) => {
    setSelectedZone(zone);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedZone) {
      setZones(zones.filter((z) => z.id !== selectedZone.id));
      toast('Zone Deleted', {
        description: `${selectedZone.name} has been removed`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      });
      setShowDeleteDialog(false);
      setSelectedZone(null);
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <>
      <div className='mb-4 justify-end md:flex'>
        <Button onClick={() => setShowAddZoneDialog(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Add Zone
        </Button>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zone Name</TableHead>
              <TableHead>Collectors</TableHead>
              <TableHead>Pending Requests</TableHead>
              <TableHead>Collections</TableHead>
              <TableHead>Utilization</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell className='font-medium'>{zone.name}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-1'>
                    <Users className='text-muted-foreground h-3 w-3' />
                    {zone.collectors}
                  </div>
                </TableCell>
                <TableCell>{zone.requests}</TableCell>
                <TableCell>{zone.completed}</TableCell>
                <TableCell>
                  <div className='w-full'>
                    <div className='mb-1 flex justify-between text-xs'>
                      <span>{zone.utilization}%</span>
                    </div>
                    <Progress
                      value={zone.utilization}
                      className={`h-2 ${getUtilizationColor(zone.utilization)}`}
                    />
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleDelete(zone)}
                  >
                    <Trash2 className='text-destructive h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showAddZoneDialog} onOpenChange={setShowAddZoneDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Zone</DialogTitle>
            <DialogDescription>
              Enter the name of the new zone or district
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            <Input
              placeholder='Zone name'
              value={newZoneName}
              onChange={(e) => setNewZoneName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowAddZoneDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddZone}>Add Zone</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Zone</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedZone?.name}? This will
              also remove all associated collection data.
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
    </>
  );
};

export default ZoneManagement;
