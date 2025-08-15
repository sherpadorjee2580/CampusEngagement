// src/Components/Calendar/Calendar.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default react-calendar styling
import "./CampusCalendar.css"; // Custom styles for the calendar
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Your Firestore instance

const CampusCalendar = () => {
  const [date, setDate] = useState(new Date()); // State for the selected date
  const [events, setEvents] = useState([]); // State to store events from Firestore
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all events for now. You might want to filter by date later for performance.
        const q = query(collection(db, "events"));
        const querySnapshot = await getDocs(q);
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Ensure eventDate is a Date object for comparison if stored as timestamp/string
          eventDate: doc.data().eventDate
            ? doc.data().eventDate.toDate()
            : null, // Convert Firestore Timestamp to JS Date
        }));
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Run once on component mount

  // Function to determine what content to render for each calendar tile
  const tileContent = ({ date, view }) => {
    // Only apply content for 'month' view
    if (view === "month") {
      const dayEvents = events.filter((event) => {
        // Check if event.eventDate is valid and matches the current tile's date
        return (
          event.eventDate &&
          event.eventDate.getFullYear() === date.getFullYear() &&
          event.eventDate.getMonth() === date.getMonth() &&
          event.eventDate.getDate() === date.getDate()
        );
      });

      if (dayEvents.length > 0) {
        return (
          <div className="event-indicator-container">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="event-indicator"
                title={event.title}
              ></div>
            ))}
          </div>
        );
      }
    }
    return null; // No content for other views or days without events
  };

  // Function to add a custom class to tiles with events
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dayHasEvents = events.some((event) => {
        return (
          event.eventDate &&
          event.eventDate.getFullYear() === date.getFullYear() &&
          event.eventDate.getMonth() === date.getMonth() &&
          event.eventDate.getDate() === date.getDate()
        );
      });
      return dayHasEvents ? "has-event" : null;
    }
    return null;
  };

  return (
    <div className="calendar-section">
      <h2>Campus Calendar</h2>
      {loading && <p>Loading events...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent} // Custom content inside tiles
          tileClassName={tileClassName} // Custom class names for tiles
          className="react-calendar-custom" // Apply your custom styling
        />
      )}

      {/* Display events for the selected date */}
      <div className="selected-date-events">
        <h3>Events on {date.toDateString()}</h3>
        {events.filter(
          (event) =>
            event.eventDate &&
            event.eventDate.getFullYear() === date.getFullYear() &&
            event.eventDate.getMonth() === date.getMonth() &&
            event.eventDate.getDate() === date.getDate()
        ).length > 0 ? (
          <ul>
            {events
              .filter(
                (event) =>
                  event.eventDate &&
                  event.eventDate.getFullYear() === date.getFullYear() &&
                  event.eventDate.getMonth() === date.getMonth() &&
                  event.eventDate.getDate() === date.getDate()
              )
              .map((event) => (
                <li key={event.id}>
                  <strong>{event.title}</strong> - {event.description}
                </li>
              ))}
          </ul>
        ) : (
          <p>No events on this date.</p>
        )}
      </div>
    </div>
  );
};

export default CampusCalendar;
