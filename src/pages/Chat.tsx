
import React from 'react';
import Layout from '@/components/Layout';
import ChatInterface from '@/components/ChatInterface';
import PatientDashboard from '@/components/PatientDashboard';

const Chat: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold animate-slide-up">Medical Assistant</h1>
        <p className="text-muted-foreground animate-fade-in">
          Consult with our AI to retrieve and analyze patient information
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChatInterface />
          <PatientDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
