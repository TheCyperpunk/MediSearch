
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth page
    navigate('/auth');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-medical-muted/50">
      <div className="text-center animate-pulse-subtle">
        <h1 className="text-4xl font-bold text-gradient">MediSearch</h1>
        <p className="text-xl text-muted-foreground mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
