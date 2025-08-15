import React from "react"; // No useState, useEffect, or Firebase imports needed here
import "./ExploreEvents.css";
import { useNavigate, useOutletContext } from "react-router-dom"; // Use useNavigate and useOutletContext

// The main ExploreEvents component
const ExploreEvents = () => {
  const navigate = useNavigate();
  // Get the 'events' array from the Outlet Context (provided by Dashboard/App.jsx)
  const { events } = useOutletContext();

  const handleAddEvent = () => {
    navigate("/new-event");
  };

  return (
    <div className="exploreEvent">
      <div className="exploreEvent-container">
        <span className="exploreEvent-title">Explore Campus Events</span>
        <span className="exploreEvent-description-main">
          Discover and participate in a wide range of campus activities and
          gatherings.
        </span>

        {/* Add Event Button */}
        <div className="exploreEvent-addEventSection">
          <button
            onClick={handleAddEvent}
            className="exploreEvent-addEventButton"
          >
            + Add New Event
          </button>
        </div>

        {/* Start of the filter form section (no changes) */}
        <div className="exploreEvent-filterForm">
          <input type="text" placeholder="Search for events..." />
          <select>
            <option value="">Date</option>
            {/* Add date options here */}
          </select>
          <select>
            <option value="">Category</option>
            {/* Add category options here */}
          </select>
          <select>
            <option value="">Location</option>
            {/* Add location options here */}
          </select>
          <button>Apply Filters</button>
        </div>
        {/* End of the filter form section */}

        {/* Display events from state */}
        <div className="exploreEvent-eventBoxContainer">
          {events.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No events found. Be the first to add one!
            </p>
          ) : (
            events.map((event) => (
              <div className="exploreEvent-eventBox" key={event.id}>
                {/* Use event.image which will now be the local URL from NewEvent */}
                <img src={event.image} alt={event.name} />
                <span className="exploreEvent-eventName">{event.name}</span>
                <span className="exploreEvent-eventDescription">
                  {event.description}
                </span>
                <div className="exploreEvent-eventDate">
                  <div className="exploreEvent-eventDateLogo"></div>{" "}
                  <span className="exploreEvent-eventBoxText">
                    {event.date}
                  </span>
                </div>
                <div className="exploreEvent-eventTime">
                  <div className="exploreEvent-eventDateLogo"></div>{" "}
                  <span className="exploreEvent-eventBoxText">
                    {event.time}
                  </span>
                </div>
                <div className="exploreEvent-eventLocation">
                  <div className="exploreEvent-eventLocationLogo"></div>{" "}
                  <span className="exploreEvent-eventBoxText">
                    {event.location}
                  </span>
                </div>
                <div className="exploreEvent-eventCategory">
                  {event.category}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreEvents;
