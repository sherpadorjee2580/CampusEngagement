import React from "react";
import "./ExploreEvents.css";

// The main ExploreEvents component containing all logic and JSX
const ExploreEvents = () => {
  // Dummy data array for events
  const eventsData = [
    {
      id: 1,
      image: "event1.jpg",
      name: "Annual Campus Spring Festival",
      description:
        "Celebrate the arrival of spring with live music, food trucks, and local artisan booths. A day of fun for the whole campus community!",
      date: "August 15, 2025",
      time: "6:30am - 6:30pm",
      location: "University Green",
      category: "Social",
    },
    {
      id: 2,
      image: "event2.jpg",
      name: "Tech Innovation Summit",
      description:
        "Explore the latest in technology with workshops, expert speakers, and a startup showcase. Network with future leaders in tech.",
      date: "May 16, 2025",
      time: "9:00am - 5:00pm",
      location: "Engineering Building Auditorium",
      category: "Academic",
    },
    {
      id: 3,
      image: "event3.jpg",
      name: "Intramural Soccer Tournament",
      description:
        "Cheer on your favorite teams as they compete for the championship title. Great food and a lively atmosphere for all spectators.",
      date: "June 8, 2025",
      time: "1:00pm - 6:00pm",
      location: "Campus Sports Field",
      category: "Sporting",
    },
    {
      id: 4,
      image: "event4.jpg",
      name: "Open Mic Night",
      description:
        "Share your talents or enjoy performances from your peers. A relaxed evening of music, poetry, and comedy.",
      date: "April 28, 2025",
      time: "7:00pm - 9:00pm",
      location: "Student Union Lounge",
      category: "Social",
    },
    {
      id: 5,
      image: "event5.jpg",
      name: "Career Development Workshop",
      description:
        "Boost your resume, master interview skills, and network with professionals from various industries. Your next career move starts here.",
      date: "May 22, 2025",
      time: "10:00am - 12:00pm",
      location: "Career Services Center",
      category: "Academic",
    },
    {
      id: 6,
      image: "event6.jpg",
      name: "Student Art Showcase",
      description:
        "Discover the creativity of our student artists. Paintings, sculptures, and digital art will be on display.",
      date: "June 1, 2025",
      time: "3:00pm - 7:00pm",
      location: "Campus Art Gallery",
      category: "Arts & Culture",
    },
    {
      id: 7,
      image: "event7.jpg",
      name: "Sustainability Seminar",
      description:
        "Learn about environmental initiatives on campus and how you can make a difference. Guest speakers and hands-on activities.",
      date: "May 5, 2025",
      time: "2:00pm - 4:00pm",
      location: "Environmental Science Lab",
      category: "Academic",
    },
    {
      id: 8,
      image: "event3.jpg",
      name: "Campus Cooking Class: Italian Delights",
      description:
        "Master the art of Italian cuisine with a hands-on cooking class led by a professional chef. Buon Appetito!",
      date: "July 10, 2025",
      time: "6:00pm - 9:00pm",
      location: "Student Culinary Studio",
      category: "Social",
    },
    {
      id: 9,
      image: "event2.jpg",
      name: "Summer Book Club Kick-off",
      description:
        "Join us to discuss our first summer read and meet fellow book lovers. Snacks and refreshments will be provided.",
      date: "July 7, 2025",
      time: "4:00pm - 5:30pm",
      location: "University Library Reading Room",
      category: "Academic",
    },
  ];

  return (
    <div className="exploreEvent">
      <div className="exploreEvent-container">
        <span className="exploreEvent-title">Explore Campus Events</span>
        <span className="exploreEvent-description-main">
          Discover and participate in a wide range of campus activities and
          gatherings.
        </span>
        {/* Start of the filter form section */}
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

        <div className="exploreEvent-eventBoxContainer">
          {eventsData.map((event) => (
            <div className="exploreEvent-eventBox" key={event.id}>
              <img src={event.image} alt={event.name} />
              <span className="exploreEvent-eventName">{event.name}</span>
              <span className="exploreEvent-eventDescription">
                {event.description}
              </span>
              <div className="exploreEvent-eventDate">
                <div className="exploreEvent-eventDateLogo"></div>
                <span className="exploreEvent-eventBoxText">{event.date}</span>
              </div>
              <div className="exploreEvent-eventTime">
                <div className="exploreEvent-eventDateLogo"></div>
                <span className="exploreEvent-eventBoxText">{event.time}</span>
              </div>
              <div className="exploreEvent-eventLocation">
                <div className="exploreEvent-eventLocationLogo"></div>
                <span className="exploreEvent-eventBoxText">
                  {event.location}
                </span>
              </div>
              <div className="exploreEvent-eventCategory">{event.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreEvents;
