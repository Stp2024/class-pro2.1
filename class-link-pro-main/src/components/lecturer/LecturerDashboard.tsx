import { useState } from 'react';
import { Users, Calendar, Bell, Settings, BookOpen, LogOut, PlusCircle, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LecturerTimetable from './LecturerTimetable';
import LecturerProfile from './LecturerProfile';

interface LecturerDashboardProps {
  onLogout: () => void;
}

const LecturerDashboard = ({ onLogout }: LecturerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('timetable');

  // Mock lecturer data
  const lecturerInfo = {
    name: 'Mrs. Shilpa K C',
    subjects: ['SE & PM', 'Software Engineering', 'Project Management'],
    email: 'shilpa.kc@college.edu',
    totalClasses: 12,
    todayClasses: 3
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return <LecturerTimetable />;
      case 'notifications':
        return (
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Send Notifications</h3>
            <p className="text-muted-foreground">Notification management interface coming soon...</p>
          </Card>
        );
      case 'calendar':
        return (
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Event Calendar</h3>
            <p className="text-muted-foreground">Calendar management interface coming soon...</p>
          </Card>
        );
      case 'profile':
        return <LecturerProfile />;
      default:
        return <LecturerTimetable />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Lecturer Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {lecturerInfo.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex">
                Faculty ID: FAC001
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === 'timetable' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('timetable')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Timetable
                </Button>
                <Button
                  variant={activeTab === 'notifications' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === 'calendar' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('calendar')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Events
                </Button>
                <Button
                  variant={activeTab === 'tasks' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('tasks')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Assignments
                </Button>
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </nav>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 mt-4">
              <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button size="sm" className="w-full justify-start">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Class
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Schedule
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Alert
                </Button>
              </div>
            </Card>

            {/* Subject Overview */}
            <Card className="p-4 mt-4">
              <h3 className="font-semibold text-foreground mb-3">My Subjects</h3>
              <div className="space-y-2">
                {lecturerInfo.subjects.map((subject, index) => (
                  <div key={index} className="p-2 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium text-primary">{subject}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">{lecturerInfo.totalClasses}</p>
                    <p className="text-xs text-muted-foreground">Total Classes/Week</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{lecturerInfo.todayClasses}</p>
                    <p className="text-xs text-muted-foreground">Classes Today</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;