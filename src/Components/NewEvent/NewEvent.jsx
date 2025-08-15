import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewEvent.css";

// No Firebase imports needed for this version

// Receive addEvent as a prop
const NewEvent = ({ addEvent }) => {
  const navigate = useNavigate();

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState(""); // Initialize as empty for better UX
  const [eventTime, setEventTime] = useState(""); // Initialize as empty for better UX
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("Academic"); // Default category
  const [eventHeaderImageFile, setEventHeaderImageFile] = useState(null); // Stores the actual File object
  const [eventHeaderImageUrl, setEventHeaderImageUrl] = useState(""); // Stores URL for preview
  const [loading, setLoading] = useState(false); // Still good to have for general form submission
  const [error, setError] = useState(null); // Still good to have for general form submission

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventHeaderImageFile(file);
      setEventHeaderImageUrl(URL.createObjectURL(file)); // For local preview
    } else {
      setEventHeaderImageFile(null);
      setEventHeaderImageUrl("");
    }
  };

  const handleSubmit = (e) => {
    // Now synchronous as no async Firebase calls
    e.preventDefault();
    setLoading(true); // Still show loading while processing
    setError(null);

    // Prepare data for the `addEvent` function
    // For now, we'll store the local URL for the image
    const newEvent = {
      name: eventTitle, // Use 'name' to match your ExploreEvents data structure
      description: eventDescription,
      date: eventDate, // Storing as string for simplicity without Firebase date objects
      time: eventTime, // Storing as string
      location: eventLocation,
      category: eventCategory,
      image: eventHeaderImageUrl || "placeholder-event.jpg", // Use local URL or a placeholder
    };

    // Call the addEvent function passed from App.jsx
    addEvent(newEvent);

    setLoading(false);
    // Redirect to the explore events page or a success message
    navigate("/explore-events"); // Redirect directly to explore events
    // OR if you want a success page: navigate("/event-added-success");
  };

  return (
    <div className="newEvent">
      <div className="newEvent-container">
        <h1 className="newEvent-title">Create New Event</h1>
        <p className="newEvent-subtitle">
          Fill out the details below to add a new event to Campus Connect.
        </p>

        {error && (
          <p
            className="error-message"
            style={{ color: "red", textAlign: "center" }}
          >
            {error}
          </p>
        )}
        {loading && (
          <p className="loading-message" style={{ textAlign: "center" }}>
            Creating event...
          </p>
        )}

        <form onSubmit={handleSubmit} className="newEvent-form">
          <div className="newEvent-formGroup">
            <label htmlFor="eventTitle" className="newEvent-label">
              Event Title
            </label>
            <input
              type="text"
              id="eventTitle"
              className="newEvent-input"
              placeholder="e.g., Annual Tech Fest 2024"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="newEvent-formGroup">
            <label htmlFor="eventDescription" className="newEvent-label">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              className="newEvent-textarea"
              placeholder="Provide a detailed description of your event, including agenda, speakers, and what attendees can expect."
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows="5"
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="newEvent-formGroup newEvent-twoColumn">
            <div className="newEvent-column">
              <label htmlFor="eventDate" className="newEvent-label">
                Date
              </label>
              <input
                type="date"
                id="eventDate"
                className="newEvent-input"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="newEvent-column">
              <label htmlFor="eventTime" className="newEvent-label">
                Time
              </label>
              <input
                type="time"
                id="eventTime"
                className="newEvent-input"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="newEvent-formGroup">
            <label htmlFor="eventLocation" className="newEvent-label">
              Location
            </label>
            <input
              type="text"
              id="eventLocation"
              className="newEvent-input"
              placeholder="e.g., University Auditorium, Room 301"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="newEvent-formGroup">
            <label htmlFor="eventCategory" className="newEvent-label">
              Category
            </label>
            <select
              id="eventCategory"
              className="newEvent-select"
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              required
              disabled={loading}
            >
              <option value="Academic">Academic</option>
              <option value="Social">Social</option>
              <option value="Sport">Sport</option>
              <option value="Cultural">Cultural</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div className="newEvent-formGroup">
            <label htmlFor="eventHeaderImage" className="newEvent-label">
              Event Header Image
            </label>
            <div className="newEvent-imageUploadContainer">
              {eventHeaderImageUrl ? (
                <img
                  src={eventHeaderImageUrl}
                  alt="Event Header Preview"
                  className="newEvent-uploadedImage"
                />
              ) : (
                <div className="newEvent-imagePlaceholder"></div>
              )}
              <input
                type="file"
                id="eventHeaderImage"
                className="newEvent-fileInput"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
              />
              <label
                htmlFor="eventHeaderImage"
                className="newEvent-uploadButton"
              >
                {eventHeaderImageUrl ? "Change Image" : "Upload Image"}
              </label>
            </div>
          </div>

          <div className="newEvent-actions">
            <button
              type="button"
              className="newEvent-cancelButton"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="newEvent-createButton"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
