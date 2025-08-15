import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import "./CampusCalendar.css"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; 

const CampusCalendar = () => {
  const [date, setDate] = useState(new Date()); 
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "events"));
        const querySnapshot = await getDocs(q);
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          eventDate: doc.data().eventDate
            ? doc.data().eventDate.toDate()
            : null, 
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
  }, []); 

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayEvents = events.filter((event) => {
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
    return null; 
  };

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
          tileContent={tileContent} 
          tileClassName={tileClassName} 
          className="react-calendar-custom" 
        />
      )}

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
