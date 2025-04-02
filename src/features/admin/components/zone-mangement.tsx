import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trash2,
  Users,
  Search,
  FilterX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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
  },
  {
    id: '6',
    name: 'Downtown District',
    collectors: 7,
    requests: 18,
    completed: 37,
    utilization: 85
  },
  {
    id: '7',
    name: 'Harbor Area',
    collectors: 4,
    requests: 9,
    completed: 24,
    utilization: 70
  },
  {
    id: '8',
    name: 'Highland Region',
    collectors: 3,
    requests: 7,
    completed: 15,
    utilization: 45
  },
  {
    id: '9',
    name: 'Industrial Zone',
    collectors: 8,
    requests: 22,
    completed: 50,
    utilization: 92
  },
  {
    id: '10',
    name: 'Residential Area',
    collectors: 5,
    requests: 14,
    completed: 28,
    utilization: 65
  }
];

const ZoneManagement = () => {
  const [zones, setZones] = useState(MOCK_ZONES);
  const [showAddZoneDialog, setShowAddZoneDialog] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter state
  const [nameFilter, setNameFilter] = useState('');
  const [utilizationFilter, setUtilizationFilter] = useState('all');
  const [collectorsFilter, setCollectorsFilter] = useState('all');

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
        description: `${newZoneName} has been added successfully`,
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

  const resetFilters = () => {
    setNameFilter('');
    setUtilizationFilter('all');
    setCollectorsFilter('all');
    setCurrentPage(1);
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Filter and paginate zones
  const filteredZones = useMemo(() => {
    return zones.filter((zone) => {
      // Apply name filter
      if (
        nameFilter &&
        !zone.name.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }

      // Apply utilization filter
      if (utilizationFilter && utilizationFilter !== 'all') {
        if (utilizationFilter === 'low' && zone.utilization >= 70) return false;
        if (
          utilizationFilter === 'medium' &&
          (zone.utilization < 70 || zone.utilization >= 90)
        )
          return false;
        if (utilizationFilter === 'high' && zone.utilization < 90) return false;
      }

      // Apply collectors filter
      if (collectorsFilter && collectorsFilter !== 'all') {
        if (collectorsFilter === '0-2' && zone.collectors > 2) return false;
        if (
          collectorsFilter === '3-5' &&
          (zone.collectors < 3 || zone.collectors > 5)
        )
          return false;
        if (collectorsFilter === '6+' && zone.collectors < 6) return false;
      }

      return true;
    });
  }, [zones, nameFilter, utilizationFilter, collectorsFilter]);

  const totalPages = Math.ceil(filteredZones.length / itemsPerPage);

  // Calculate active filter count - exclude 'all' values from count
  const activeFilterCount = [
    nameFilter,
    utilizationFilter !== 'all' ? utilizationFilter : '',
    collectorsFilter !== 'all' ? collectorsFilter : ''
  ].filter(Boolean).length;

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredZones.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    // Ensure we don't go beyond available pages if filters reduce item count
    const maxPage = Math.max(1, totalPages);
    setCurrentPage(Math.min(pageNumber, maxPage));
  };

  // Calculate pagination display values
  const startItem =
    filteredZones.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredZones.length);

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-6'>
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='relative flex-1'>
            <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
            <Input
              placeholder='Search zone names...'
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className='pl-8'
            />
          </div>

          <div className='flex flex-col gap-2 md:flex-row'>
            <div className='w-full'>
              <Select
                value={utilizationFilter}
                onValueChange={setUtilizationFilter}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Utilization' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Any Utilization</SelectItem>
                  <SelectItem value='low'>Low (&lt; 70%)</SelectItem>
                  <SelectItem value='medium'>Medium (70-89%)</SelectItem>
                  <SelectItem value='high'>High (≥ 90%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='w-full'>
              <Select
                value={collectorsFilter}
                onValueChange={setCollectorsFilter}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Collectors' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Any Collectors</SelectItem>
                  <SelectItem value='0-2'>0-2 Collectors</SelectItem>
                  <SelectItem value='3-5'>3-5 Collectors</SelectItem>
                  <SelectItem value='6+'>6+ Collectors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className='md:ml-auto'
              onClick={() => setShowAddZoneDialog(true)}
            >
              <Plus className='mr-2 h-4 w-4' />
              Add Zone
            </Button>

            {activeFilterCount > 0 && (
              <Button
                variant='ghost'
                onClick={resetFilters}
                className='gap-2'
                title='Reset filters'
              >
                <FilterX className='h-4 w-4' />
                Clear
              </Button>
            )}
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className='flex flex-wrap gap-2'>
            {nameFilter && (
              <Badge variant='secondary' className='gap-1'>
                Name: {nameFilter}
                <button
                  onClick={() => setNameFilter('')}
                  className='hover:text-destructive ml-1'
                >
                  ×
                </button>
              </Badge>
            )}

            {utilizationFilter && utilizationFilter !== 'all' && (
              <Badge variant='secondary' className='gap-1'>
                Utilization:{' '}
                {utilizationFilter === 'low'
                  ? 'Low'
                  : utilizationFilter === 'medium'
                    ? 'Medium'
                    : 'High'}
                <button
                  onClick={() => setUtilizationFilter('all')}
                  className='hover:text-destructive ml-1'
                >
                  ×
                </button>
              </Badge>
            )}

            {collectorsFilter && collectorsFilter !== 'all' && (
              <Badge variant='secondary' className='gap-1'>
                Collectors: {collectorsFilter}
                <button
                  onClick={() => setCollectorsFilter('all')}
                  className='hover:text-destructive ml-1'
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className='my-4 rounded-md border'>
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
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='text-muted-foreground h-24 text-center'
                >
                  No zones found matching the current filters
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((zone) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col items-center justify-between gap-4 py-4 sm:flex-col'>
        <div className='text-muted-foreground text-sm'>
          Showing {startItem} to {endItem} of {filteredZones.length} items
        </div>
        <div className='flex items-center space-x-6'>
          {/* <div className="flex flex-col md:flex-row items-center space-x-2 gap-1">
            <span className="text-sm font-medium">Items per page</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='min-w-[4rem] text-center text-sm'>
              {currentPage} of {totalPages || 1}
            </span>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronsRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
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
    </div>
  );
};

export default ZoneManagement;
