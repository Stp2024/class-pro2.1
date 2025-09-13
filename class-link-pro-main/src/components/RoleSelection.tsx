import { GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RoleSelectionProps {
  onRoleSelect: (role: 'student' | 'lecturer') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-medium">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            College Management Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive solution for academic excellence and seamless college management
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Student Card */}
          <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm">
            <div 
              className="p-8 text-center"
              onClick={() => onRoleSelect('student')}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Student Portal</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Access your timetable, track attendance, manage assignments, and stay updated with college notifications
              </p>
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary-dark transition-colors shadow-soft"
                onClick={() => onRoleSelect('student')}
              >
                Enter as Student
              </Button>
            </div>
          </Card>

          {/* Lecturer Card */}
          <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm">
            <div 
              className="p-8 text-center"
              onClick={() => onRoleSelect('lecturer')}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Lecturer Portal</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Manage timetables, send notifications, track student progress, and organize academic activities
              </p>
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary-dark transition-colors shadow-soft"
                onClick={() => onRoleSelect('lecturer')}
              >
                Enter as Lecturer
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-success rounded"></div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">Instant notifications for schedule changes</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-warning rounded"></div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Smart Tracking</h3>
              <p className="text-sm text-muted-foreground">Automated attendance and progress monitoring</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Mobile Ready</h3>
              <p className="text-sm text-muted-foreground">Responsive design for all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;