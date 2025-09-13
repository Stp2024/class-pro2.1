import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Users, Clock, Award } from 'lucide-react';

const LecturerProfile = () => {
  const lecturerInfo = {
    name: 'Mrs. Shilpa K C',
    id: 'FAC001',
    department: 'Computer Science Engineering',
    designation: 'Assistant Professor',
    email: 'shilpa.kc@college.edu',
    phone: '+91 98765 43210',
    address: 'Bangalore, Karnataka',
    experience: '8 years',
    subjects: ['SE & PM', 'Software Engineering', 'Project Management', 'Software Testing'],
    qualifications: ['M.Tech in Computer Science', 'B.E in Computer Science', 'PhD (Pursuing)']
  };

  const teachingStats = [
    { label: 'Total Students', value: '120', icon: Users, color: 'text-blue-600' },
    { label: 'Classes per Week', value: '12', icon: Clock, color: 'text-green-600' },
    { label: 'Subjects Taught', value: '4', icon: BookOpen, color: 'text-purple-600' },
    { label: 'Teaching Experience', value: '8 Years', icon: Award, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-1 p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{lecturerInfo.name}</h2>
            <Badge className="mt-2">{lecturerInfo.designation}</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Faculty ID</p>
                <p className="text-sm text-muted-foreground">{lecturerInfo.id}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Department</p>
                <p className="text-sm text-muted-foreground">{lecturerInfo.department}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">{lecturerInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">{lecturerInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">{lecturerInfo.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Experience</p>
                <p className="text-sm text-muted-foreground">{lecturerInfo.experience}</p>
              </div>
            </div>
          </div>

          <Button className="w-full mt-6" variant="outline">
            Edit Profile
          </Button>
        </Card>

        {/* Teaching Statistics */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Teaching Overview</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {teachingStats.map((stat, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-background ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subjects Taught */}
          <div className="mb-6">
            <h4 className="font-semibold text-foreground mb-3">Subjects Taught</h4>
            <div className="flex flex-wrap gap-2">
              {lecturerInfo.subjects.map((subject, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Qualifications</h4>
            <ul className="space-y-2">
              {lecturerInfo.qualifications.map((qual, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{qual}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Current Semester Information */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Current Semester Details</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-2">Academic Year</h4>
            <p className="text-muted-foreground">2024-25</p>
            <p className="text-sm text-muted-foreground">Semester 5 & 6</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Class Responsibilities</h4>
            <p className="text-muted-foreground">3rd Year CSE Students</p>
            <p className="text-sm text-muted-foreground">All sections & batches</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Office Hours</h4>
            <p className="text-muted-foreground">Mon-Fri: 9:00 AM - 5:00 PM</p>
            <p className="text-sm text-muted-foreground">Available for student consultations</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>View Schedule</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Student List</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Grade Book</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Send Notice</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LecturerProfile;