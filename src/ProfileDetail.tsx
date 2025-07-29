import { useParams } from 'react-router-dom';

export default function ProfileDetail() {
  const { profileId } = useParams<{ profileId: string }>(); 

  return (
    <div>
      <h2>Profile Detail Page</h2>
      <p>Viewing profile with ID: {profileId}</p>
    </div>
  );
}

