import { useNavigate } from 'react-router-dom';
import LecturerDashboard from '@/components/lecturer/LecturerDashboard';

const LecturerPortal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return <LecturerDashboard onLogout={handleLogout} />;
};

export default LecturerPortal;