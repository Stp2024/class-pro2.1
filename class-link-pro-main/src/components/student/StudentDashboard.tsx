import { useState } from 'react';
import { Calendar, Clock, BookOpen, CheckSquare, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StudentTimetable from './StudentTimetable';
import StudentProfile from './StudentProfile';
import StudentTasks from './StudentTasks';
import StudentCalendar from './StudentCalendar';
import StudentAttendance from './StudentAttendance';
import Notifications from '../Notifications';
import { getCurrentDaySchedule, formatTime } from '@/data/timetable';

interface StudentDashboardProps {
  onLogout: () => void;
}

const StudentDashboard = ({ onLogout }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState('timetable');
  const todaySchedule = getCurrentDaySchedule();
  const currentTime = new Date();
  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  // Find current/next class
  const upcomingClass = todaySchedule.find(slot => slot.startTime > timeString);
  const currentClass = todaySchedule.find(slot => 
    slot.startTime <= timeString && slot.endTime > timeString
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return <StudentTimetable />;
      case 'attendance':
        return <StudentAttendance />;
      case 'tasks':
        return <StudentTasks />;
      case 'calendar':
        return <StudentCalendar />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentTimetable />;
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
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Student Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome back, John Doe</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex">
                USN: 4CB21CS001
              </Badge>
              <Notifications userRole="student" />
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
                  variant={activeTab === 'attendance' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('attendance')}
                >
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Attendance
                </Button>
                <Button
                  variant={activeTab === 'tasks' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('tasks')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Tasks
                </Button>
                <Button
                  variant={activeTab === 'calendar' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('calendar')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar
                </Button>
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </nav>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 mt-4">
              <h3 className="font-semibold text-foreground mb-3">Today's Overview</h3>
              <div className="space-y-3">
                {currentClass && (
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-success">Current Class</span>
                    </div>
                    <p className="text-sm text-foreground font-medium">{currentClass.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(currentClass.startTime)} - {formatTime(currentClass.endTime)}
                    </p>
                  </div>
                )}
                
                {upcomingClass && (
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium text-warning">Next Class</span>
                    </div>
                    <p className="text-sm text-foreground font-medium">{upcomingClass.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(upcomingClass.startTime)} - {formatTime(upcomingClass.endTime)}
                    </p>
                  </div>
                )}
                
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Classes Today</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{todaySchedule.length}</p>
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

export default StudentDashboard;