
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  BarChart, 
  Settings, 
  AlertCircle,
  PlusCircle,
  FileText,
  Heart
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive, isOpen }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-sidebar-foreground hover:bg-sidebar-accent'
        }
        ${isOpen ? 'justify-start' : 'justify-center'}
      `}
    >
      <div className="flex-shrink-0">{icon}</div>
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: <Users size={20} />, label: 'Patients', to: '/dashboard' },
    { icon: <MessageSquare size={20} />, label: 'Chat', to: '/chat' },
    { icon: <Heart size={20} />, label: 'Medical Records', to: '/records' },
    { icon: <FileText size={20} />, label: 'Lab Results', to: '/lab-results' },
    { icon: <BarChart size={20} />, label: 'Analytics', to: '/analytics' },
    { icon: <AlertCircle size={20} />, label: 'Alerts', to: '/alerts' },
    { icon: <Settings size={20} />, label: 'Settings', to: '/settings' },
  ];

  return (
    <aside 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-sidebar z-40 transition-all duration-300 ease-in-out border-r border-sidebar-border 
        ${isOpen ? 'w-64' : 'w-16'}`
      }
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin pb-4">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={location.pathname === item.to}
              isOpen={isOpen}
            />
          ))}
        </div>
        
        <div className="mt-auto">
          <div className={`${isOpen ? 'p-3' : 'p-2'} bg-sidebar-accent rounded-lg`}>
            <div className="flex items-center gap-3">
              {isOpen ? (
                <>
                  <PlusCircle size={18} className="text-primary" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">New Patient</h4>
                    <p className="text-xs text-muted-foreground">Add patient record</p>
                  </div>
                </>
              ) : (
                <div className="mx-auto">
                  <PlusCircle size={20} className="text-primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
