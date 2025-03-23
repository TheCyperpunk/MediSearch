
import React, { useState } from 'react';
import PatientSearch from '@/components/PatientSearch';
import PatientCard from '@/components/PatientCard';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample patient data
const patientData = [
  {
    id: '12345678',
    name: 'John Doe',
    age: 42,
    gender: 'Male',
    condition: 'Hypertension',
    lastVisit: '2 weeks ago',
  },
  {
    id: '23456789',
    name: 'Jane Smith',
    age: 35,
    gender: 'Female',
    condition: 'Diabetes',
    lastVisit: '1 month ago',
  },
  {
    id: '34567890',
    name: 'Robert Johnson',
    age: 58,
    gender: 'Male',
    condition: 'Heart Disease',
    lastVisit: '3 days ago',
  },
  {
    id: '45678901',
    name: 'Emily Davis',
    age: 29,
    gender: 'Female',
    condition: 'Asthma',
    lastVisit: '2 months ago',
  },
  {
    id: '56789012',
    name: 'Michael Wilson',
    age: 47,
    gender: 'Male',
    condition: 'Arthritis',
    lastVisit: '1 week ago',
  },
  {
    id: '67890123',
    name: 'Sarah Thompson',
    age: 61,
    gender: 'Female',
    condition: 'COPD',
    lastVisit: '5 days ago',
  },
];

const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState(patientData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearch = (query: string, filterOption: string) => {
    setSearchQuery(query);
    setFilter(filterOption);
    
    let filtered = patientData;
    
    // Apply search query
    if (query) {
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.id.includes(query)
      );
    }
    
    // Apply filter
    if (filterOption === 'recent') {
      filtered = filtered.filter(patient => 
        patient.lastVisit.includes('day') || patient.lastVisit.includes('week')
      );
    } else if (filterOption === 'critical') {
      filtered = filtered.filter(patient => 
        patient.condition === 'Heart Disease' || patient.condition === 'COPD'
      );
    }
    
    setPatients(filtered);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold animate-slide-up">Patient Dashboard</h1>
        </div>
        
        <PatientSearch onSearch={handleSearch} />
        
        <Tabs defaultValue="all" className="w-full animate-fade-in">
          <TabsList>
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Today</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4">
            {patients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patients.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    id={patient.id}
                    name={patient.name}
                    age={patient.age}
                    gender={patient.gender}
                    condition={patient.condition}
                    lastVisit={patient.lastVisit}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-2">No patients found matching your criteria</p>
                <button
                  onClick={() => handleSearch('', 'all')}
                  className="text-primary hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recent" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patientData
                .filter(patient => 
                  patient.lastVisit.includes('day') || patient.lastVisit.includes('week')
                )
                .map((patient) => (
                  <PatientCard
                    key={patient.id}
                    id={patient.id}
                    name={patient.name}
                    age={patient.age}
                    gender={patient.gender}
                    condition={patient.condition}
                    lastVisit={patient.lastVisit}
                  />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patientData
                .filter(patient => patient.id === '34567890' || patient.id === '67890123')
                .map((patient) => (
                  <PatientCard
                    key={patient.id}
                    id={patient.id}
                    name={patient.name}
                    age={patient.age}
                    gender={patient.gender}
                    condition={patient.condition}
                    lastVisit={patient.lastVisit}
                  />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
