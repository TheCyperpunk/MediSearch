
import React from 'react';
import AuthForm from '@/components/AuthForm';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-background to-medical-muted/50">
    {/* //   <div className="w-full max-w-md mb-8 text-center animate-slide-up">
    //     <h1 className="text-4xl font-bold text-gradient mb-2">MediSearch</h1>
    //     <p className="text-muted-foreground">
    //       AI-powered medical assistant for healthcare professionals
    //     </p>
    //   </div> */}
      <AuthForm />
      <p className="mt-8 text-sm text-muted-foreground text-center animate-fade-in">
        By using this platform, you agree to comply with all applicable
        <br />healthcare privacy and security regulations
      </p>
    </div>
  );
};

export default Auth;
