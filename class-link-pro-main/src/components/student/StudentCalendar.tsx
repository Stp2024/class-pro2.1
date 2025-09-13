import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { CollegeEvent } from '@/types';

const StudentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sample events data
  const events: CollegeEvent[] = [
    {
      id: '1',
      title: 'Diwali Holiday',
      date: '2024-01-15',
      type: 'holiday',
      description: 'Festival of Lights celebration'
    },
    {
      id: '2',
      title: 'AI/ML Workshop',
      date: '2024-01-18',
      type: 'workshop',
      description: 'Introduction to Machine Learning concepts'
    },
    {
      id: '3',
      title: 'Mid-Semester Exams',
      date: '2024-01-22',
      type: 'exam',
      description: 'Mid-term examinations for all subjects'
    },
    {
      id: '4',
      title: 'Tech Seminar',
      date: '2024-01-25',
      type: 'seminar',
      description: 'Industry experts sharing latest trends'
    },
    {
      id: '5',
      title: 'Republic Day',
      date: '2024-01-26',
      type: 'holiday',
      description: 'National Holiday'
    },
    {
      id: '6',
      title: 'End Semester Exams',
      date: '2024-02-15',
      type: 'exam',
      description: 'Final examinations'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'holiday':
        return 'bg-success text-success-foreground';
      case 'exam':
        return 'bg-destructive text-destructive-foreground';
      case 'workshop':
        return 'bg-primary text-primary-foreground';
      case 'seminar':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'holiday':
        return '🏖️';
      case 'exam':
        return '📝';
      case 'workshop':
        return '🛠️';
      case 'seminar':
        return '🎤';
      default:
        return '📅';
    }
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getEventsForMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthNumber = month.getMonth();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === monthNumber;
    });
  };

  const selectedDateEvents = getEventsForDate(selectedDate);
  const monthEvents = getEventsForMonth(currentMonth);

  const eventDates = events.map(event => new Date(event.date));

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Academic Calendar</h2>
          <p className="text-muted-foreground">College events, holidays, and important dates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-muted-foreground">Holidays</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-muted-foreground">Exams</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">Workshops</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-muted-foreground">Seminars</span>
                </div>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              modifiers={{ 
                event: eventDates
              }}
              modifiersStyles={{
                event: { 
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))',
                  backgroundColor: 'hsl(var(--primary) / 0.1)'
                }
              }}
              className="w-full"
            />
          </Card>
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short', 
                day: 'numeric' 
              })}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                    )}
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No events scheduled</p>
              </div>
            )}
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="text-lg">{getEventTypeIcon(event.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
            </div>
          </Card>

          {/* Month Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Events</span>
                <span className="font-medium text-foreground">{monthEvents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Holidays</span>
                <span className="font-medium text-foreground">
                  {monthEvents.filter(e => e.type === 'holiday').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Exams</span>
                <span className="font-medium text-foreground">
                  {monthEvents.filter(e => e.type === 'exam').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Workshops</span>
                <span className="font-medium text-foreground">
                  {monthEvents.filter(e => e.type === 'workshop').length}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentCalendar;