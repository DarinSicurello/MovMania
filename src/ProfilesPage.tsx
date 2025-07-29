import { Link, Outlet } from 'react-router-dom';

export default function ProfilesPage() {
  const profiles = [1, 2, 3, 4, 5];

  return (
    <div className="container mt-4">
      <h2>Profiles</h2>

      <div className="d-flex">
        {/* Vertical nav list on the left */}
        <ul className="nav flex-column me-4">
          {profiles.map((profile) => (
            <li className="nav-item" key={profile}>
              <Link className="nav-link" to={`profile/${profile}`}>
                Profile {profile}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dynamic profile content on the right */}
        <div className="flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
