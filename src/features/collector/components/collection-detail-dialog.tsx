import { useState, useEffect, JSX } from 'react';
import { Trash2, Save, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CollectedItem, GarbageList } from 'types';

interface CollectionDetailsDialogProps {
  event: GarbageList;
  getStatusBadge: (status: string) => JSX.Element;
}

const CollectionDetailsDialog = ({
  event,
  getStatusBadge
}: CollectionDetailsDialogProps) => {
  const [selectedEvent, setSelectedEvent] = useState<GarbageList | null>(null);
  const [selectedGarbageType, setSelectedGarbageType] = useState<string>('');
  const [showWeightInput, setShowWeightInput] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>('');
  const [collectedItems, setCollectedItems] = useState<CollectedItem[]>([]);

  // Reset states when dialog is closed
  useEffect(() => {
    if (!selectedEvent) {
      setSelectedGarbageType('');
      setShowWeightInput(false);
      setWeight('');
    }
  }, [selectedEvent]);

  // Show weight input when a garbage type is selected
  useEffect(() => {
    if (selectedGarbageType) {
      setShowWeightInput(true);
    } else {
      setShowWeightInput(false);
      setWeight('');
    }
  }, [selectedGarbageType]);

  const handleSaveItem = () => {
    if (selectedGarbageType && weight && parseFloat(weight) > 0) {
      // Add the new item to the collection
      setCollectedItems([
        ...collectedItems,
        {
          type: selectedGarbageType,
          weight: parseFloat(weight)
        }
      ]);

      // Reset input fields for next entry
      setSelectedGarbageType('');
      setWeight('');
      setShowWeightInput(false);
    }
  };

  const handleOpenDialog = () => {
    setSelectedEvent(event);
    setCollectedItems([]);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
    setSelectedGarbageType('');
    setWeight('');
    setCollectedItems([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className='cursor-pointer' onClick={handleOpenDialog}>
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
                {selectedEvent.address.street}, {selectedEvent.address.city},{' '}
                {selectedEvent.address.district}, {selectedEvent.address.state},{' '}
                {selectedEvent.address.pincode}
              </div>

              <div className='font-semibold'>Waste Type:</div>
              <div className='col-span-2'>
                <Select
                  value={selectedGarbageType}
                  onValueChange={setSelectedGarbageType}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select waste type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='PET bottles'>PET bottles</SelectItem>
                    <SelectItem value='Aluminium cans'>
                      Aluminium cans
                    </SelectItem>
                    <SelectItem value='Paper'>Paper</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showWeightInput && (
                <>
                  <div className='font-semibold'>Total Weight (kg):</div>
                  <div className='col-span-2 flex gap-2'>
                    <Input
                      type='number'
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder='Enter weight in kg'
                      className='w-full'
                    />
                    <Button
                      size='sm'
                      onClick={handleSaveItem}
                      disabled={!weight || parseFloat(weight) <= 0}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                </>
              )}
            </div>

            {collectedItems.length > 0 && (
              <div className='mt-6'>
                <h3 className='mb-2 text-sm font-medium'>Collected Items:</h3>
                <ul className='space-y-2'>
                  {collectedItems.map((item, index) => (
                    <li
                      key={index}
                      className='bg-muted flex items-center justify-between rounded-md p-2'
                    >
                      <span>{item.type}</span>
                      <Badge variant='secondary'>{item.weight} kg</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter className='sm:justify-between'>
            <Button className='flex cursor-pointer items-center gap-1'>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CollectionDetailsDialog;
