
import React from 'react';
import { Calendar, Activity,  Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface PatientCardProps {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition?: string;
  lastVisit: string;
  image?: string;
}

const PatientCard: React.FC<PatientCardProps> = ({
  id,
  name,
  age,
  gender,
  condition,
  lastVisit,
  image,
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-medical-primary to-medical-accent text-white flex items-center justify-center text-lg font-medium">
              {name.charAt(0)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-medium text-foreground truncate">{name}</p>
            <p className="text-sm text-muted-foreground">
              {age} years • {gender}
            </p>
            {condition && (
              <div className="mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-medical-muted text-medical-primary">
                  {condition}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>MRN: {id.slice(0, 6)}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Activity className="h-3.5 w-3.5" />
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            {/* <FileMedical className="h-3.5 w-3.5" />  */}
            <span>5 Records</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{lastVisit}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-secondary/50 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/records`}>Records</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to={`/chat`}>Consult</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
