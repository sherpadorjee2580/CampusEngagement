import React, { useState, useEffect } from "react"; 
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    profilePicture: "profile.jpg",
    name: "Dorji Sherpa",
    bio: "Enthusiastic student passionate about technology, community service, and campus events. Always eager to connect and collaborate!",
    major: "Computer Science",
    year: "Senior",
    interests: ["Web Development", "Volunteering", "Photography", "Hiking"],
    campusClubs: ["Tech Club", "Volunteer Society"],
    contactEmail: "john.doe@example.edu",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });
  const [showSaveMessage, setShowSaveMessage] = useState(false); 

  useEffect(() => {
    if (showSaveMessage) {
      const timer = setTimeout(() => {
        setShowSaveMessage(false);
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [showSaveMessage]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableUser({ ...user }); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (e) => {
    const value = e.target.value;
    setEditableUser((prev) => ({
      ...prev,
      interests: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleClubsChange = (e) => {
    const value = e.target.value;
    setEditableUser((prev) => ({
      ...prev,
      campusClubs: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    setUser({ ...editableUser }); 
    setIsEditing(false);
    setShowSaveMessage(true); 
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableUser((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="userProfile">
      <div className="userProfile-container">
        <div className="userProfile-header">
          <div className="userProfile-avatarContainer">
            <img
              src={editableUser.profilePicture}
              alt="Profile"
              className="userProfile-avatar"
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  id="profilePicUpload"
                  className="userProfile-fileInput"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                />
                <label
                  htmlFor="profilePicUpload"
                  className="userProfile-uploadOverlay"
                >
                  <span className="userProfile-uploadIcon">📷</span>
                </label>
              </>
            )}
          </div>
          <div className="userProfile-info">
            {isEditing ? (
              <input
                type="text"
                name="name"
                className="userProfile-input userProfile-nameInput"
                value={editableUser.name}
                onChange={handleChange}
              />
            ) : (
              <h2 className="userProfile-name">{user.name}</h2>
            )}
            {isEditing ? (
              <input
                type="email"
                name="contactEmail"
                className="userProfile-input userProfile-emailInput"
                value={editableUser.contactEmail}
                onChange={handleChange}
              />
            ) : (
              <span className="userProfile-email">{user.contactEmail}</span>
            )}

            {isEditing ? (
              <button onClick={handleSave} className="userProfile-saveButton">
                Save Profile
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="userProfile-editButton"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="userProfile-section">
          <h3 className="userProfile-sectionTitle">About Me</h3>
          {isEditing ? (
            <textarea
              name="bio"
              className="userProfile-textarea"
              value={editableUser.bio}
              onChange={handleChange}
              rows="4"
            ></textarea>
          ) : (
            <p className="userProfile-text">{user.bio}</p>
          )}
        </div>

        <div className="userProfile-section userProfile-detailsGrid">
          <div className="userProfile-detailItem">
            <span className="userProfile-detailLabel">Major:</span>
            {isEditing ? (
              <input
                type="text"
                name="major"
                className="userProfile-input"
                value={editableUser.major}
                onChange={handleChange}
              />
            ) : (
              <span className="userProfile-detailValue">{user.major}</span>
            )}
          </div>
          <div className="userProfile-detailItem">
            <span className="userProfile-detailLabel">Year:</span>
            {isEditing ? (
              <input
                type="text"
                name="year"
                className="userProfile-input"
                value={editableUser.year}
                onChange={handleChange}
              />
            ) : (
              <span className="userProfile-detailValue">{user.year}</span>
            )}
          </div>
        </div>

        <div className="userProfile-section">
          <h3 className="userProfile-sectionTitle">Interests</h3>
          {isEditing ? (
            <input
              type="text"
              className="userProfile-input"
              value={editableUser.interests.join(", ")}
              onChange={handleInterestsChange}
              placeholder="e.g., Photography, Coding, Reading"
            />
          ) : (
            <div className="userProfile-tags">
              {user.interests.map((interest, index) => (
                <span key={index} className="userProfile-tag">
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="userProfile-section">
          <h3 className="userProfile-sectionTitle">Campus Clubs</h3>
          {isEditing ? (
            <input
              type="text"
              className="userProfile-input"
              value={editableUser.campusClubs.join(", ")}
              onChange={handleClubsChange}
              placeholder="e.g., Tech Club, Debate Society"
            />
          ) : (
            <ul className="userProfile-list">
              {user.campusClubs.map((club, index) => (
                <li key={index} className="userProfile-listItem">
                  {club}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="userProfile-section">
          <h3 className="userProfile-sectionTitle">Social Media</h3>
          <div className="userProfile-socialLinks">
            {isEditing ? (
              <>
                <div className="userProfile-socialInputGroup">
                  <span className="userProfile-socialLabel">LinkedIn:</span>
                  <input
                    type="text"
                    name="linkedin"
                    className="userProfile-input"
                    value={editableUser.socialLinks.linkedin}
                    onChange={handleSocialLinkChange}
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="userProfile-socialInputGroup">
                  <span className="userProfile-socialLabel">Twitter:</span>
                  <input
                    type="text"
                    name="twitter"
                    className="userProfile-input"
                    value={editableUser.socialLinks.twitter}
                    onChange={handleSocialLinkChange}
                    placeholder="Twitter URL"
                  />
                </div>
              </>
            ) : (
              <>
                {user.socialLinks.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="userProfile-socialLink"
                  >
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                )}
                {user.socialLinks.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="userProfile-socialLink"
                  >
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showSaveMessage && (
        <div className="userProfile-saveMessage">
          Profile successfully saved! 🎉
        </div>
      )}
    </div>
  );
};

export default UserProfile;
