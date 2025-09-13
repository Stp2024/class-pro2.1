import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AttendanceRecord } from '@/types';

const StudentAttendance = () => {
  // Sample attendance data
  const attendanceRecords: AttendanceRecord[] = [
    { subjectCode: 'SE & PM', percentage: 85, status: 'excellent' },
    { subjectCode: 'CN', percentage: 78, status: 'good' },
    { subjectCode: 'TC', percentage: 72, status: 'warning' },
    { subjectCode: 'CV', percentage: 65, status: 'critical' },
    { subjectCode: 'RM & IPR', percentage: 88, status: 'excellent' },
    { subjectCode: 'DV Lab', percentage: 90, status: 'excellent' },
    { subjectCode: 'Mini Project', percentage: 95, status: 'excellent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-success';
      case 'good':
        return 'text-primary';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'good':
        return <TrendingUp className="w-5 h-5 text-primary" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'critical':
        return <TrendingDown className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 75) return 'bg-primary';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-destructive';
  };

  const overallAttendance = Math.round(
    attendanceRecords.reduce((sum, record) => sum + record.percentage, 0) / attendanceRecords.length
  );

  const criticalSubjects = attendanceRecords.filter(record => record.status === 'critical');
  const excellentSubjects = attendanceRecords.filter(record => record.status === 'excellent');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Attendance Tracking</h2>
        <p className="text-muted-foreground">Monitor your class attendance across all subjects</p>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-2">{overallAttendance}%</div>
          <div className="text-sm text-muted-foreground">Overall Attendance</div>
          <div className={`text-xs mt-1 ${getStatusColor(overallAttendance >= 80 ? 'excellent' : overallAttendance >= 75 ? 'good' : overallAttendance >= 70 ? 'warning' : 'critical')}`}>
            {overallAttendance >= 80 ? 'Excellent' : overallAttendance >= 75 ? 'Good' : overallAttendance >= 70 ? 'Warning' : 'Critical'}
          </div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-success mb-2">{excellentSubjects.length}</div>
          <div className="text-sm text-muted-foreground">Excellent Subjects</div>
          <div className="text-xs text-success mt-1">≥80% Attendance</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-destructive mb-2">{criticalSubjects.length}</div>
          <div className="text-sm text-muted-foreground">Critical Subjects</div>
          <div className="text-xs text-destructive mt-1">&lt;70% Attendance</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-2">{attendanceRecords.length}</div>
          <div className="text-sm text-muted-foreground">Total Subjects</div>
          <div className="text-xs text-muted-foreground mt-1">Active Courses</div>
        </Card>
      </div>

      {/* Critical Alert */}
      {criticalSubjects.length > 0 && (
        <Card className="p-4 border-destructive bg-destructive/5">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            <div>
              <h3 className="font-semibold text-destructive">Attendance Alert</h3>
              <p className="text-sm text-muted-foreground">
                You have {criticalSubjects.length} subject(s) with critical attendance. 
                Attend classes regularly to avoid academic penalties.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Subject-wise Attendance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Subject-wise Attendance</h3>
        <div className="space-y-6">
          {attendanceRecords.map((record, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <h4 className="font-medium text-foreground">{record.subjectCode}</h4>
                    <p className="text-sm text-muted-foreground">
                      {record.percentage >= 80 ? 'Excellent attendance' : 
                       record.percentage >= 75 ? 'Good attendance' :
                       record.percentage >= 70 ? 'Needs improvement' : 
                       'Critical - attend more classes'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getStatusColor(record.status)}`}>
                    {record.percentage}%
                  </div>
                  <Badge variant="outline" className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress 
                  value={record.percentage} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span className="flex space-x-4">
                    <span className={record.percentage >= 70 ? 'text-foreground' : 'text-destructive'}>70%</span>
                    <span className={record.percentage >= 75 ? 'text-foreground' : 'text-muted-foreground'}>75%</span>
                    <span className={record.percentage >= 80 ? 'text-foreground' : 'text-muted-foreground'}>80%</span>
                  </span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Attendance Guidelines */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Attendance Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-success"></div>
              <div>
                <div className="font-medium text-foreground">Excellent (≥80%)</div>
                <div className="text-sm text-muted-foreground">No restrictions, eligible for all activities</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <div>
                <div className="font-medium text-foreground">Good (75-79%)</div>
                <div className="text-sm text-muted-foreground">Meets minimum requirement</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-warning"></div>
              <div>
                <div className="font-medium text-foreground">Warning (70-74%)</div>
                <div className="text-sm text-muted-foreground">Attend more classes to avoid penalties</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-destructive"></div>
              <div>
                <div className="font-medium text-foreground">Critical (&lt;70%)</div>
                <div className="text-sm text-muted-foreground">May not be eligible for exams</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentAttendance;