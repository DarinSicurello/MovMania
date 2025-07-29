import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProfilesPage() {
  // Set new profile form 
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // All profiles from JSON server Loacl Recat Server profile.json
  const [profiles, setProfiles] = useState<any[]>([]);

  // State to hold new profile data - 3.7 new data Removed ID 
  const [newProfile, setNewProfile] = useState({
    name: '',
    email: '',
    title: '',
    titleDescription: '',
    bio: '',
    avatarUrl: ''
  });

  // Get profileId from URL params (react-router)
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();

  // Load profiles from JSON file via API LOCAL File
  useEffect(() => {
    fetch('http://localhost:3001/profiles')
      .then(res => res.json())
      .then(data => setProfiles(data))
      .catch(err => console.error('Failed to fetch profiles:', err));
  }, []);

  // Handle changes profile form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProfile(prev => ({ ...prev, [name]: value }));
  };

  // Save new profile or update existing one
  const handleSave = () => {
    if (isEditing && editId) {
      // PUT update 3.7
      fetch(`http://localhost:3001/profiles/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProfile, id: editId }),
      })
        .then(res => res.json())
        .then(updated => {
          setProfiles(prev =>
            prev.map(p => (p.id === editId ? updated : p))
          );
          resetForm();
        })
        .catch(err => console.error('Failed to update profile:', err));
    } else {
      // POST new profile 3.7
      fetch('http://localhost:3001/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Profile created:', data);
          setProfiles(prev => [...prev, data]);
          resetForm();
        })
        .catch(err => {
          console.error('Failed to save profile:', err);
        });
    }
  };

  // Edit a profile Update ... v3.7
  const handleEdit = (profile: any) => {
    setNewProfile({
      name: profile.name,
      email: profile.email,
      title: profile.title,
      titleDescription: profile.titleDescription,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl
    });
    setEditId(profile.id);
    setIsEditing(true);
    setShowForm(true);
  };

  // Delete a profile UPDATE Delete a profile 3.7
  const handleDelete = (id: string) => {
    fetch(`http://localhost:3001/profiles/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProfiles(prev => prev.filter(p => p.id !== id));
        // If currently editing this one, reset form
        if (editId === id) resetForm();
        // If viewing this profile, navigate away after deletion
        if (profileId === id) navigate('/profiles');
      })
      .catch(err => console.error('Failed to delete profile:', err));
  };

  // Reset form and state
  const resetForm = () => {
    setNewProfile({
      name: '',
      email: '',
      title: '',
      titleDescription: '',
      bio: '',
      avatarUrl: ''
    });
    setEditId(null);
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="main-con d-flex">
      <div className="left-section me-4">
        <h2>Profiles</h2>

        {/* Vert nav list */}
        <ul className="nav flex-column me-4">
          {profiles.map((profile) => (
            <li className="nav-item mb-2" key={profile.id}>
              {/* Just link, no buttons here */}
              <Link className="nav-link" to={`profile/${profile.id}`}>
                {profile.name}
              </Link>
            </li>
          ))}

          {/* Button w Boostrap */}
          <li className="nav-item mt-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              New Profile
            </button>
          </li>
        </ul>
      </div>

      {/* Dynamic profile Bootstrap content right side */}
      <div className="right-section flex-grow-1">
        {/* Show new profile form if changed */}
        {showForm ? (
          <div className="p-3 border rounded bg-light mb-4">
            <h3>{isEditing ? 'Edit Profile' : 'Create New Profile'}</h3>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newProfile.name}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newProfile.email}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newProfile.title}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="titleDescription"
              placeholder="Title Description"
              value={newProfile.titleDescription}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={newProfile.bio}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="avatarUrl"
              placeholder="Avatar URL"
              value={newProfile.avatarUrl}
              onChange={handleChange}
              className="form-control mb-2"
            />

            {/* Save or Cancel buttons */}
            <button className="btn btn-success me-2" onClick={handleSave}>
              {isEditing ? 'Update Profile' : 'Save Profile'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* MY Outlet Tag for dynamic profile content */}
            <Outlet />

            {/* Show Edit & Delete buttons only if a profile is selected */}
            {profileId && (
              <div className="mt-3">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => {
                    const profileToEdit = profiles.find(p => p.id === profileId);
                    if (profileToEdit) handleEdit(profileToEdit);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(profileId)}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
