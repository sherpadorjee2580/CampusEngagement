import React, { useState } from "react";
import "./CommunityHub.css";

const CommunityHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("members");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const groups = [
    {
      id: 1,
      name: "Campus Robotics Club",
      icon: "🤖",
      members: 120,
      description:
        "Explore the fascinating world of robotics, from design to programming.",
      category: "technology",
      longDescription:
        "Join our vibrant robotics community where innovation meets creativity! We design, build, and program robots for competitions, research, and pure enjoyment. From beginners learning basic Arduino programming to advanced members working on autonomous systems, everyone finds their place here. Our weekly workshops cover mechanical design, electronics, programming, and project management. We participate in national competitions like FIRST Robotics and host our own campus robotics challenges.",
      meetingTime: "Thursdays 7:00 PM",
      location: "Engineering Building Room 204",
      contact: "robotics@university.edu",
      founded: "2018",
      achievements: [
        "1st Place Regional FIRST Competition 2024",
        "Best Innovation Award 2023",
        "Featured in Tech Magazine",
      ],
      upcomingEvents: [
        "Robot Battle Competition - March 15",
        "Arduino Workshop - March 22",
        "Lab Open House - March 30",
      ],
    },
    {
      id: 2,
      name: "Sustainable Campus Initiative",
      icon: "🌱",
      members: 95,
      description:
        "Dedicated to promoting eco-friendly practices and environmental awareness.",
      category: "environment",
      longDescription:
        "We are passionate advocates for environmental sustainability on campus and beyond. Our mission is to create a greener, more sustainable university through education, action, and policy advocacy. We organize campus clean-up events, promote recycling programs, manage the community garden, and work with administration on sustainable policies. Members gain hands-on experience in environmental science, policy development, and community organizing.",
      meetingTime: "Tuesdays 6:30 PM",
      location: "Student Center Room 301",
      contact: "sustainability@university.edu",
      founded: "2019",
      achievements: [
        "Reduced campus waste by 25%",
        "Installed 50 recycling stations",
        "Planted 200+ trees",
      ],
      upcomingEvents: [
        "Earth Day Festival - April 22",
        "Garden Volunteer Day - March 25",
        "Sustainability Fair - April 5",
      ],
    },
    {
      id: 3,
      name: "Student Art Collective",
      icon: "🎨",
      members: 150,
      description:
        "A vibrant community for artists of all mediums to share, create, and inspire.",
      category: "arts",
      longDescription:
        "Express your creativity and connect with fellow artists in our inclusive, supportive community. We welcome all forms of artistic expression - painting, sculpture, digital art, photography, mixed media, and experimental works. Our collective organizes monthly exhibitions, collaborative projects, artist talks, and skill-sharing workshops. Whether you're a seasoned artist or just starting your creative journey, you'll find inspiration and support here.",
      meetingTime: "Wednesdays 7:30 PM",
      location: "Arts Building Studio 102",
      contact: "artcollective@university.edu",
      founded: "2017",
      achievements: [
        "50+ Student Exhibitions",
        "Community Mural Project",
        "Art Scholarship Program",
      ],
      upcomingEvents: [
        "Spring Art Show - April 10",
        "Pottery Workshop - March 28",
        "Artist Guest Lecture - April 3",
      ],
    },
    {
      id: 4,
      name: "Debate Society",
      icon: "🗣️",
      members: 60,
      description:
        "Hone your public speaking and critical thinking skills. Engage in stimulating debates.",
      category: "academic",
      longDescription:
        "Sharpen your mind and voice through the art of debate! Our society provides a platform for intellectual discourse, critical thinking, and persuasive communication. We host weekly debates on current events, philosophical questions, and policy issues. Members develop research skills, learn formal debate structures, and gain confidence in public speaking. We compete in intercollegiate tournaments and host public debates for the campus community.",
      meetingTime: "Mondays 8:00 PM",
      location: "Library Conference Room B",
      contact: "debate@university.edu",
      founded: "2015",
      achievements: [
        "State Championship Winners 2023",
        "20+ Public Debates",
        "Parliamentary Debate Certification",
      ],
      upcomingEvents: [
        "Climate Policy Debate - March 20",
        "Debate Tournament - April 12",
        "Public Speaking Workshop - March 27",
      ],
    },
    {
      id: 5,
      name: "Photography Club",
      icon: "📷",
      members: 95,
      description:
        "Capture the world through your lens. Join workshops, photo walks, and competitions.",
      category: "arts",
      longDescription:
        "See the world through a different lens with our passionate photography community! From smartphone photography to professional DSLR techniques, we explore all aspects of visual storytelling. Our activities include guided photo walks, technical workshops, darkroom sessions, and critique groups. We cover landscape, portrait, street, macro, and experimental photography. Members showcase their work in exhibitions and compete in local and national photography contests.",
      meetingTime: "Saturdays 2:00 PM",
      location: "Media Lab & Various Locations",
      contact: "photography@university.edu",
      founded: "2016",
      achievements: [
        "Annual Photo Exhibition",
        "Published Campus Calendar",
        "National Contest Winners",
      ],
      upcomingEvents: [
        "Nature Photography Walk - March 23",
        "Portrait Workshop - March 30",
        "Photo Contest Deadline - April 15",
      ],
    },
    {
      id: 6,
      name: "Literary Guild",
      icon: "📚",
      members: 70,
      description:
        "A haven for book lovers and aspiring writers. Discuss literature, share your work.",
      category: "academic",
      longDescription:
        "Dive deep into the world of words with fellow literature enthusiasts and aspiring writers. Our guild celebrates the written word in all its forms - novels, poetry, short stories, essays, and experimental writing. We host book discussions, creative writing workshops, author readings, and publishing seminars. Members share their original works, provide constructive feedback, and collaborate on literary projects including our annual anthology.",
      meetingTime: "Fridays 7:00 PM",
      location: "English Department Lounge",
      contact: "literary@university.edu",
      founded: "2014",
      achievements: [
        "Published 5 Student Anthologies",
        "Author Reading Series",
        "Writing Contest Winners",
      ],
      upcomingEvents: [
        "Poetry Reading - March 26",
        "Novel Discussion: 1984 - April 2",
        "Writing Workshop - April 9",
      ],
    },
    {
      id: 7,
      name: "Chess & Strategy Society",
      icon: "♟️",
      members: 45,
      description:
        "Challenge your mind with strategic board games. All skill levels welcome, from beginners to masters.",
      category: "games",
      longDescription:
        "Exercise your strategic thinking through the ancient game of chess and other mind-challenging board games. Our society welcomes players of all skill levels, from complete beginners to tournament players. We offer chess lessons, strategy workshops, puzzle solving sessions, and friendly tournaments. Beyond chess, we explore other strategic games like Go, Checkers, and modern strategy board games. Critical thinking and sportsmanship are our core values.",
      meetingTime: "Thursdays 6:00 PM",
      location: "Student Lounge Game Room",
      contact: "chess@university.edu",
      founded: "2020",
      achievements: [
        "University Chess Championship",
        "Beginner Program (100+ taught)",
        "Regional Tournament Participants",
      ],
      upcomingEvents: [
        "Weekly Tournament - Every Thursday",
        "Beginner Chess Clinic - March 24",
        "Strategy Game Night - April 1",
      ],
    },
    {
      id: 8,
      name: "Gaming Association",
      icon: "🎮",
      members: 200,
      description:
        "Connect with fellow gamers for casual play, tournaments, and gaming events.",
      category: "games",
      longDescription:
        "Level up your gaming experience with our diverse community of gamers! We embrace all forms of gaming - video games, tabletop RPGs, card games, and board games. Our association hosts regular LAN parties, tournament nights, game development workshops, and social events. Whether you're into competitive esports, cooperative adventures, or casual gaming, you'll find your tribe here. We also support aspiring game developers and streamers.",
      meetingTime: "Fridays 8:00 PM",
      location: "Student Center Gaming Lounge",
      contact: "gaming@university.edu",
      founded: "2019",
      achievements: [
        "Esports Tournament Champions",
        "Game Development Showcase",
        "500+ Event Participants",
      ],
      upcomingEvents: [
        "Smash Bros Tournament - March 22",
        "D&D Campaign Start - March 29",
        "Game Dev Workshop - April 5",
      ],
    },
    {
      id: 9,
      name: "Volunteer Outreach Program",
      icon: "🤝",
      members: 110,
      description:
        "Make a difference in the local community. Participate in various volunteer activities and service projects.",
      category: "community",
      longDescription:
        "Transform lives and communities through meaningful volunteer service. Our program connects students with local nonprofits, schools, shelters, and community organizations. We coordinate regular volunteer opportunities including tutoring, food drives, environmental cleanup, elderly care visits, and community development projects. Members develop leadership skills, cultural awareness, and civic responsibility while making a tangible positive impact.",
      meetingTime: "Sundays 4:00 PM",
      location: "Community Service Center",
      contact: "volunteer@university.edu",
      founded: "2013",
      achievements: [
        "10,000+ Volunteer Hours",
        "Partnership with 25+ Organizations",
        "Community Impact Award",
      ],
      upcomingEvents: [
        "Food Bank Volunteer - March 21",
        "Reading Program - March 28",
        "Park Cleanup - April 4",
      ],
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "environment", label: "Environment" },
    { value: "arts", label: "Arts" },
    { value: "academic", label: "Academic" },
    { value: "games", label: "Games" },
    { value: "community", label: "Community" },
  ];

  const sortOptions = [
    { value: "members", label: "Sort by Members" },
    { value: "name", label: "Sort by Name" },
    { value: "newest", label: "Sort by Newest" },
  ];

  const filteredAndSortedGroups = groups
    .filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || group.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "members") return b.members - a.members;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const openModal = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  // Close modal on escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  return (
    <div className="communityHub">
      <div className="communityHub-container">
        <div className="communityHub-header">
          <div className="communityHub-title">
            <h1>Community Hub</h1>
            <p>
              Discover and connect with vibrant student organizations and campus
              groups.
            </p>
          </div>
          <button className="communityHub-createBtn">
            <span className="plus-icon">+</span>
            Create a New Group
          </button>
        </div>

        <div className="communityHub-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-container">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-container">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="communityHub-grid">
          {filteredAndSortedGroups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-card-header">
                <div className="group-icon">{group.icon}</div>
                <div className="group-info">
                  <h3 className="group-name">{group.name}</h3>
                  <span className="group-members">{group.members} Members</span>
                </div>
              </div>

              <div className="group-description">
                <p>{group.description}</p>
              </div>

              <div className="group-card-footer">
                <button
                  className="view-details-btn"
                  onClick={() => openModal(group)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && selectedGroup && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">{selectedGroup.icon}</div>
                <div>
                  <h2 className="modal-title">{selectedGroup.name}</h2>
                  <p className="modal-members">
                    {selectedGroup.members} Members
                  </p>
                </div>
              </div>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>About</h3>
                <p>{selectedGroup.longDescription}</p>
              </div>

              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <h4>📅 Meeting Time</h4>
                  <p>{selectedGroup.meetingTime}</p>
                </div>
                <div className="modal-info-item">
                  <h4>📍 Location</h4>
                  <p>{selectedGroup.location}</p>
                </div>
                <div className="modal-info-item">
                  <h4>📧 Contact</h4>
                  <p>{selectedGroup.contact}</p>
                </div>
                <div className="modal-info-item">
                  <h4>🗓️ Founded</h4>
                  <p>{selectedGroup.founded}</p>
                </div>
              </div>

              <div className="modal-section">
                <h3>Achievements</h3>
                <ul className="achievement-list">
                  {selectedGroup.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3>Upcoming Events</h3>
                <ul className="event-list">
                  {selectedGroup.upcomingEvents.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions">
                <button className="join-btn">Join Group</button>
                <button className="contact-btn">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;
