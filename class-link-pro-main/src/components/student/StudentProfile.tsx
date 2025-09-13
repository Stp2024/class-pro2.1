import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, TrendingUp } from 'lucide-react';

const StudentProfile = () => {
  // Mock attendance data
  const attendanceData = [
    { subject: 'SE & PM', percentage: 88, status: 'excellent' as const },
    { subject: 'CN', percentage: 76, status: 'good' as const },
    { subject: 'TC', percentage: 72, status: 'warning' as const },
    { subject: 'CV', percentage: 68, status: 'critical' as const },
    { subject: 'RM & IPR', percentage: 82, status: 'excellent' as const },
    { subject: 'EVS', percentage: 90, status: 'excellent' as const },
  ];

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-success bg-success/10';
      case 'good': return 'text-warning bg-warning/10';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-danger bg-danger/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAttendanceIcon = (percentage: number) => {
    if (percentage >= 80) return '✅';
    if (percentage >= 75) return '⚠️';
    if (percentage >= 70) return '❗';
    return '🚨';
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-1 p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">John Doe</h2>
            <Badge className="mt-2">Computer Science Engineering</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">USN</p>
                <p className="text-sm text-muted-foreground">4CB21CS001</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Academic Year</p>
                <p className="text-sm text-muted-foreground">2024-25 (3rd Year)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">john.doe@college.edu</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">Bangalore, Karnataka</p>
              </div>
            </div>
          </div>

          <Button className="w-full mt-6" variant="outline">
            Edit Profile
          </Button>
        </Card>

        {/* Attendance Overview */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Attendance Overview</h3>
            <Badge variant="outline" className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>Overall: 79.3%</span>
            </Badge>
          </div>

          <div className="grid gap-4">
            {attendanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getAttendanceIcon(item.percentage)}</div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.status === 'excellent' && 'Excellent Attendance'}
                      {item.status === 'good' && 'Good Attendance'}
                      {item.status === 'warning' && 'Attendance Warning'}
                      {item.status === 'critical' && 'Critical - Action Required'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(item.status)}`}>
                    {item.percentage}%
                  </div>
                  <div className="w-32 bg-muted rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        item.status === 'excellent' ? 'bg-success' :
                        item.status === 'good' ? 'bg-warning' :
                        item.status === 'warning' ? 'bg-orange-500' : 'bg-danger'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <h4 className="font-medium text-primary">Attendance Guidelines</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimum 75% attendance required for exam eligibility</li>
              <li>• 80%+ attendance: Excellent standing</li>
              <li>• Below 70%: Immediate attention required</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>View Full Calendar</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Download Timetable</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Attendance Report</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StudentProfile;