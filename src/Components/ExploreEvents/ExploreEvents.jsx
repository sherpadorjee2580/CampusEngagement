import React, { useState, useEffect } from "react"; // Import useState and useEffect
import "./ExploreEvents.css";
import { useNavigate, useOutletContext } from "react-router-dom";

// The main ExploreEvents component
const ExploreEvents = () => {
  const navigate = useNavigate();
  // Get the 'events' array from the Outlet Context (provided by Dashboard/App.jsx)
  const { events } = useOutletContext(); // This `events` is your master list

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events); // State for displayed events

  // Update filtered events whenever events or filters change
  useEffect(() => {
    let currentFilteredEvents = events;

    // 1. Apply Search Term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFilteredEvents = currentFilteredEvents.filter(
        (event) =>
          event.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          event.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          event.location.toLowerCase().includes(lowerCaseSearchTerm) ||
          event.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // 2. Apply Date Filter
    if (filterDate) {
      currentFilteredEvents = currentFilteredEvents.filter((event) => {
        // Assuming event.date is in a format like "Month Day, Year"
        // We need to parse it or ensure consistency for comparison
        // For simple string comparison, ensure exact match if filterDate is a full date string
        return event.date === filterDate;
      });
    }

    // 3. Apply Category Filter
    if (filterCategory) {
      currentFilteredEvents = currentFilteredEvents.filter(
        (event) => event.category === filterCategory
      );
    }

    // 4. Apply Location Filter
    if (filterLocation) {
      currentFilteredEvents = currentFilteredEvents.filter(
        (event) => event.location === filterLocation
      );
    }

    setFilteredEvents(currentFilteredEvents);
  }, [events, searchTerm, filterDate, filterCategory, filterLocation]); // Re-run effect when these change

  const handleAddEvent = () => {
    navigate("/new-event");
  };

  const handleApplyFilters = (e) => {
    e.preventDefault(); // Prevent form submission if this were a form
    // The useEffect hook already handles applying filters when state changes,
    // but having this function allows for a dedicated "Apply Filters" button action
    // if you had a different logic, or for future API calls.
    // For now, it just ensures the filters are applied.
  };

  // Extract unique values for dropdowns (optional, but good for real data)
  const uniqueDates = [...new Set(events.map((event) => event.date))].sort();
  const uniqueCategories = [
    ...new Set(events.map((event) => event.category)),
  ].sort();
  const uniqueLocations = [
    ...new Set(events.map((event) => event.location)),
  ].sort();

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

        {/* Start of the filter form section */}
        <div className="exploreEvent-filterForm">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <button onClick={handleApplyFilters}>Apply Filters</button>
        </div>
        {/* End of the filter form section */}

        {/* Display filtered events */}
        <div className="exploreEvent-eventBoxContainer">
          {filteredEvents.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No events found matching your criteria.
            </p>
          ) : (
            filteredEvents.map((event) => (
              <div className="exploreEvent-eventBox" key={event.id}>
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
