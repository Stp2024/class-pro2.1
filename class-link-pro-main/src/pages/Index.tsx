import { useNavigate } from 'react-router-dom';
import RoleSelection from '@/components/RoleSelection';
import { UserRole } from '@/types';

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'student') {
      navigate('/student');
    } else {
      navigate('/lecturer');
    }
  };

  return (
    <>
      <RoleSelection onRoleSelect={handleRoleSelect} />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: 24, 
        padding: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <div>
          <p><strong>Developer Details:</strong></p>
          <p>Name: Padmanabha</p>
          <p>5th Semester, AIML</p>
          <p>PESITM College</p>
        </div>
      </div>
    </>
  );
};

export default Index;
