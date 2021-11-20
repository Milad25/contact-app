import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <p style={{ marginBottom: '20px' }}>Page Not Found</p>
      <Link to='/'>Go Home</Link>
    </div>
  );
};

export default NotFound;
