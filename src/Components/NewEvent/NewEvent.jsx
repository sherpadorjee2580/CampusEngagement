// NewEventForm.jsx
import React, { useState } from "react";
import "./NewEvent.css";

const NewEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("2024-11-15");
  const [eventTime, setEventTime] = useState("18:00");
  const [eventLocation, setEventLocation] = useState(
    "University Auditorium, Room 301"
  );
  const [eventCategory, setEventCategory] = useState("Academic");
  const [eventHeaderImage, setEventHeaderImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to an API
    console.log({
      eventTitle,
      eventDescription,
      eventDate,
      eventTime,
      eventLocation,
      eventCategory,
      eventHeaderImage,
    });
    alert("Event created (check console for data)!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventHeaderImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="newEvent">
      <div className="newEvent-container">
        <h1 className="newEvent-title">Create New Event</h1>
        <p className="newEvent-subtitle">
          Fill out the details below to add a new event to Campus Connect.
        </p>

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
              {eventHeaderImage ? (
                <img
                  src={eventHeaderImage}
                  alt="Event Header"
                  className="newEvent-uploadedImage"
                />
              ) : (
                <div className="newEvent-imagePlaceholder">
                  {/* Placeholder image from the screenshot */}
                </div>
              )}
              <input
                type="file"
                id="eventHeaderImage"
                className="newEvent-fileInput"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="eventHeaderImage"
                className="newEvent-uploadButton"
              >
                Upload Image
              </label>
            </div>
          </div>

          <div className="newEvent-actions">
            <button type="button" className="newEvent-cancelButton">
              Cancel
            </button>
            <button type="submit" className="newEvent-createButton">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
