export type UserRole = 'student' | 'lecturer';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  subject: string;
  lecturer: string;
  type?: 'lab' | 'theory' | 'activity';
  batch?: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export interface WeeklyTimetable {
  [key: string]: TimeSlot[];
}

export interface Student {
  id: string;
  name: string;
  usn: string;
  batch?: string;
}

export interface Lecturer {
  id: string;
  name: string;
  subjects: string[];
  email?: string;
}

export interface AttendanceRecord {
  subjectCode: string;
  percentage: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  createdBy?: string;
  type: 'assignment' | 'personal';
}

export interface CollegeEvent {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'seminar' | 'exam' | 'workshop';
  description?: string;
}