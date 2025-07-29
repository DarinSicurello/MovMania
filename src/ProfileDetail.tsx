import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProfileDetail.css'; // css file. temporary

export default function ProfileDetail() {
  // Get profileId from URL parameters
  const { profileId } = useParams<{ profileId: string }>();

  // Profile user data 
  const [user, setUser] = useState<any>(null);

  // Fetch profile from server by ID
  useEffect(() => {
    if (!profileId) return;

    fetch(`http://localhost:3001/profiles/${profileId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Profile not found');
        }
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => {
        console.error('Failed to load profile data:', err);
      });
  }, [profileId]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Profile detail page Container
  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-detail">
      <div className="avatar-container">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className="avatar-image" />
        ) : (
          <div className="avatar-fallback">{getInitials(user.name)}</div>
        )}
      </div>

      {/* Replaced "Profile Detail Page" with Name */}
      <h2>{user.name}</h2>

      <p>Viewing profile with ID: {profileId}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Title:</strong> {user.title}</p>
      <p><strong>Description:</strong> {user.titleDescription}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
}
