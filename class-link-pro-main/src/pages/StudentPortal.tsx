import { useNavigate } from 'react-router-dom';
import StudentDashboard from '@/components/student/StudentDashboard';

const StudentPortal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return <StudentDashboard onLogout={handleLogout} />;
};

export default StudentPortal;