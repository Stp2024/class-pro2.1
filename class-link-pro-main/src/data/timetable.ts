import { WeeklyTimetable } from '@/types';

export const weeklyTimetable: WeeklyTimetable = {
  monday: [
    { startTime: '08:00', endTime: '09:00', subject: 'SE & PM', lecturer: 'Mrs. Shilpa K C' },
    { startTime: '09:00', endTime: '10:00', subject: 'Library', lecturer: '' },
    { startTime: '10:30', endTime: '11:30', subject: 'RM & IPR', lecturer: 'Mrs. Afshan Mohammadi' },
    { startTime: '11:30', endTime: '12:30', subject: 'CV', lecturer: 'Dr. Likewin Thomas' },
    { startTime: '13:30', endTime: '14:30', subject: 'Mentoring', lecturer: '' },
    { startTime: '14:30', endTime: '15:30', subject: 'NSS', lecturer: 'Mrs. Tejaswini N D' },
  ],
  tuesday: [
    { startTime: '08:00', endTime: '09:00', subject: 'RM & IPR', lecturer: 'Mrs. Afshan Mohammadi' },
    { startTime: '09:00', endTime: '10:00', subject: 'TC', lecturer: 'Mrs. Tejaswini N D' },
    { startTime: '10:30', endTime: '12:30', subject: 'DV Lab (B2) / CN Lab (B1)', lecturer: 'Mrs. Akhila C V & Mrs. Swetha B S', type: 'lab' },
    { startTime: '13:30', endTime: '14:30', subject: 'NSS', lecturer: 'Mrs. Tejaswini N D' },
    { startTime: '14:30', endTime: '16:30', subject: 'Mini Project', lecturer: 'All Faculty' },
  ],
  wednesday: [
    { startTime: '08:00', endTime: '09:00', subject: 'CN', lecturer: 'Mrs. Poornima B P & Ms. Shilpa M I' },
    { startTime: '09:00', endTime: '10:00', subject: 'EVS', lecturer: 'New Faculty' },
    { startTime: '10:30', endTime: '11:30', subject: 'SE & PM', lecturer: 'Mrs. Shilpa K C' },
    { startTime: '11:30', endTime: '12:30', subject: 'TC', lecturer: 'Mrs. Tejaswini N D' },
    { startTime: '13:30', endTime: '14:30', subject: 'Remedial', lecturer: '' },
    { startTime: '14:30', endTime: '16:30', subject: 'Mini Project', lecturer: 'All Faculty' },
  ],
  thursday: [
    { startTime: '08:00', endTime: '09:00', subject: 'RM & IPR', lecturer: 'Mrs. Afshan Mohammadi' },
    { startTime: '09:00', endTime: '10:00', subject: 'CV', lecturer: 'Dr. Likewin Thomas' },
    { startTime: '10:30', endTime: '11:30', subject: 'CN', lecturer: 'Mrs. Poornima B P & Ms. Shilpa M I' },
    { startTime: '11:30', endTime: '12:30', subject: 'SE & PM', lecturer: 'Mrs. Shilpa K C' },
    { startTime: '13:30', endTime: '14:30', subject: 'TC', lecturer: 'Mrs. Tejaswini N D' },
  ],
  friday: [
    { startTime: '08:00', endTime: '09:00', subject: 'TC', lecturer: 'Mrs. Tejaswini N D' },
    { startTime: '09:00', endTime: '10:00', subject: 'CN', lecturer: 'Mrs. Poornima B P & Ms. Shilpa M I' },
    { startTime: '10:30', endTime: '11:30', subject: 'SE & PM', lecturer: 'Mrs. Shilpa K C' },
    { startTime: '11:30', endTime: '12:30', subject: 'CV', lecturer: 'Dr. Likewin Thomas' },
    { startTime: '13:30', endTime: '14:30', subject: 'Forum Activity', lecturer: '' },
  ],
  saturday: [
    { startTime: '08:00', endTime: '10:00', subject: 'DV Lab (B1) / CN Lab (B2)', lecturer: 'Mrs. Akhila C V & Mrs. Swetha B S', type: 'lab' },
    { startTime: '10:30', endTime: '11:30', subject: 'RM & IPR', lecturer: 'Mrs. Afshan Mohammadi' },
    { startTime: '11:30', endTime: '12:30', subject: 'TC', lecturer: 'Mrs. Tejaswini N D' },
  ],
};

export const getDaySchedule = (day: string) => {
  const dayKey = day.toLowerCase();
  return weeklyTimetable[dayKey] || [];
};

export const getCurrentDaySchedule = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  return getDaySchedule(today);
};

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};