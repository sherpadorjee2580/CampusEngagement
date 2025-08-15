import React, { useState, useEffect } from "react";
import "./ExploreEvents.css";
import { useNavigate, useOutletContext } from "react-router-dom";

const ExploreEvents = () => {
  const navigate = useNavigate();

  const { events } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    let currentFilteredEvents = events;

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

    if (filterDate) {
      currentFilteredEvents = currentFilteredEvents.filter((event) => {
        return event.date === filterDate;
      });
    }

    if (filterCategory) {
      currentFilteredEvents = currentFilteredEvents.filter(
        (event) => event.category === filterCategory
      );
    }

    if (filterLocation) {
      currentFilteredEvents = currentFilteredEvents.filter(
        (event) => event.location === filterLocation
      );
    }

    setFilteredEvents(currentFilteredEvents);
  }, [events, searchTerm, filterDate, filterCategory, filterLocation]);

  const handleAddEvent = () => {
    navigate("/new-event");
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
  };

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
        <div className="exploreEvent-addEventSection">
          <button
            onClick={handleAddEvent}
            className="exploreEvent-addEventButton"
          >
            + Add New Event
          </button>
        </div>
        \
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
