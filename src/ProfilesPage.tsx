import { Link, Outlet } from 'react-router-dom';
// Outlet render profile (each one)
export default function ProfilesPage() {
  const profiles = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-2 p-4">
      <h2>Profiles</h2>
      {profiles.map((profile) => (
        <Link key={profile} to={`profile/${profile}`}>
          Profile {profile}
        </Link>
      ))}

      <hr />
      <Outlet /> 
    </div>
  );
}
