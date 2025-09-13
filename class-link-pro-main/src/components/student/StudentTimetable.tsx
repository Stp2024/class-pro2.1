import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';
import { weeklyTimetable, formatTime } from '@/data/timetable';

const StudentTimetable = () => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getSubjectColor = (subject: string) => {
    const colors = {
      'SE & PM': 'bg-blue-100 text-blue-800 border-blue-200',
      'CN': 'bg-green-100 text-green-800 border-green-200',
      'TC': 'bg-purple-100 text-purple-800 border-purple-200',
      'CV': 'bg-orange-100 text-orange-800 border-orange-200',
      'RM & IPR': 'bg-pink-100 text-pink-800 border-pink-200',
      'EVS': 'bg-teal-100 text-teal-800 border-teal-200',
      'NSS': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'DV Lab (B1) / CN Lab (B2)': 'bg-red-100 text-red-800 border-red-200',
      'DV Lab (B2) / CN Lab (B1)': 'bg-red-100 text-red-800 border-red-200',
      'Mini Project': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Library': 'bg-gray-100 text-gray-800 border-gray-200',
      'Mentoring': 'bg-slate-100 text-slate-800 border-slate-200',
      'Remedial': 'bg-amber-100 text-amber-800 border-amber-200',
      'Forum Activity': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Weekly Timetable</h2>
        <Badge variant="outline" className="text-sm">
          Academic Year 2024-25
        </Badge>
      </div>

      <div className="grid gap-4">
        {days.map((day, index) => {
          const daySchedule = weeklyTimetable[day];
          const dayName = dayNames[index];
          const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === dayName;

          return (
            <Card key={day} className={`p-4 ${isToday ? 'ring-2 ring-primary shadow-medium' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {dayName}
                  {isToday && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">Today</Badge>
                  )}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {daySchedule.length} classes
                </span>
              </div>

              <div className="grid gap-3">
                {daySchedule.map((slot, slotIndex) => (
                  <div key={slotIndex} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground min-w-[120px]">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getSubjectColor(slot.subject)} font-medium border`}>
                          {slot.subject}
                        </Badge>
                        {slot.type === 'lab' && (
                          <Badge variant="outline" className="text-xs">LAB</Badge>
                        )}
                      </div>
                      
                      {slot.lecturer && (
                        <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{slot.lecturer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudentTimetable;