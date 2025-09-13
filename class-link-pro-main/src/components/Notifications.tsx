import { useState, useEffect } from 'react';
import { Bell, X, Clock, BookOpen, AlertCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getCurrentDaySchedule, formatTime } from '@/data/timetable';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'class-reminder' | 'assignment' | 'announcement' | 'event';
  timestamp: string;
  read: boolean;
  urgent?: boolean;
}

interface NotificationsProps {
  userRole: 'student' | 'lecturer';
}

const Notifications = ({ userRole }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Generate sample notifications based on user role and current schedule
    const todaySchedule = getCurrentDaySchedule();
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });

    const upcomingClass = todaySchedule.find(slot => slot.startTime > timeString);

    const sampleNotifications: Notification[] = [
      // Class reminders
      ...(upcomingClass ? [{
        id: 'class-1',
        title: 'Upcoming Class',
        message: `${upcomingClass.subject} starts in 15 minutes at ${formatTime(upcomingClass.startTime)}`,
        type: 'class-reminder' as const,
        timestamp: new Date().toISOString(),
        read: false,
        urgent: true
      }] : []),
      
      // Role-specific notifications
      ...(userRole === 'student' ? [
        {
          id: 'assignment-1',
          title: 'Assignment Due',
          message: 'Software Engineering project submission due tomorrow',
          type: 'assignment' as const,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
          urgent: true
        },
        {
          id: 'announcement-1',
          title: 'Class Postponed',
          message: 'Computer Networks lab has been rescheduled to next week',
          type: 'announcement' as const,
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          read: true
        }
      ] : [
        {
          id: 'lecturer-1',
          title: 'Class Schedule',
          message: 'SE & PM class starts in 15 minutes. Room: CS-101',
          type: 'class-reminder' as const,
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: 'lecturer-2',
          title: 'Student Query',
          message: 'John Doe has submitted an assignment query',
          type: 'announcement' as const,
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          read: false
        }
      ]),
      
      // Common notifications
      {
        id: 'event-1',
        title: 'College Event',
        message: 'AI/ML Workshop scheduled for next week. Register now!',
        type: 'event' as const,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, [userRole]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'class-reminder':
        return <Clock className="w-4 h-4 text-primary" />;
      case 'assignment':
        return <BookOpen className="w-4 h-4 text-warning" />;
      case 'announcement':
        return <AlertCircle className="w-4 h-4 text-info" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-success" />;
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0 min-w-0"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="space-y-0">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border last:border-b-0 transition-colors hover:bg-accent/50 ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                            {notification.urgent && (
                              <Badge variant="destructive" className="ml-2 text-xs">
                                Urgent
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-4 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full text-center">
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;