import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Edit3, Plus, Trash2, Users } from 'lucide-react';
import { weeklyTimetable, formatTime } from '@/data/timetable';

const LecturerTimetable = () => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Filter classes for this lecturer (Mrs. Shilpa K C)
  const lecturerClasses = (daySchedule: any[]) => {
    return daySchedule.filter(slot => 
      slot.lecturer.includes('Mrs. Shilpa K C') || 
      slot.subject === 'SE & PM'
    );
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'SE & PM': 'bg-primary text-primary-foreground',
    };
    return colors[subject as keyof typeof colors] || 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Timetable</h2>
          <p className="text-muted-foreground">Manage your weekly class schedule</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Class</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {days.map((day, index) => {
          const daySchedule = weeklyTimetable[day];
          const myClasses = lecturerClasses(daySchedule);
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
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {myClasses.length} class{myClasses.length !== 1 ? 'es' : ''}
                  </span>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {myClasses.length > 0 ? (
                <div className="grid gap-3">
                  {myClasses.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground min-w-[120px]">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={`${getSubjectColor(slot.subject)} font-medium`}>
                              {slot.subject}
                            </Badge>
                            {slot.type === 'lab' && (
                              <Badge variant="outline" className="text-xs">LAB</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>CSE Students - All Batches</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No classes scheduled for {dayName}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Class
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Timetable Management Tips */}
      <Card className="p-6 bg-muted/30">
        <h3 className="text-lg font-semibold text-foreground mb-3">Timetable Management</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Quick Actions</h4>
            <ul className="space-y-1">
              <li>• Click "Add Class" to schedule new sessions</li>
              <li>• Use edit icon to modify existing classes</li>
              <li>• Students receive instant notifications for changes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
            <ul className="space-y-1">
              <li>• Update schedule at least 24 hours in advance</li>
              <li>• Include batch information for lab sessions</li>
              <li>• Add venue details when creating classes</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LecturerTimetable;