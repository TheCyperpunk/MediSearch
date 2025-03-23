
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PatientSearchProps {
  onSearch: (query: string, filter: string) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearch = () => {
    onSearch(query, filter);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 border shadow-sm animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Patient Search</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search by name, ID or phone number"
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex space-x-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSearch;
