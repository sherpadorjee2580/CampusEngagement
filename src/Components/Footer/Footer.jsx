import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      alert(
        "Welcome to the campus community! Check your email for confirmation."
      );
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    console.log("Link clicked:", href);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div
            className={`footer-section ${isVisible ? "animate-fade-in" : ""}`}
          >
            <h3>Get Involved</h3>
            <ul>
              <li>
                <a
                  href="#events"
                  onClick={(e) => handleLinkClick(e, "#events")}
                >
                  Campus Events
                </a>
              </li>
              <li>
                <a
                  href="#organizations"
                  onClick={(e) => handleLinkClick(e, "#organizations")}
                >
                  Student Organizations
                </a>
              </li>
              <li>
                <a
                  href="#volunteer"
                  onClick={(e) => handleLinkClick(e, "#volunteer")}
                >
                  Volunteer Opportunities
                </a>
              </li>
              <li>
                <a
                  href="#leadership"
                  onClick={(e) => handleLinkClick(e, "#leadership")}
                >
                  Leadership Programs
                </a>
              </li>
              <li>
                <a href="#clubs" onClick={(e) => handleLinkClick(e, "#clubs")}>
                  Join a Club
                </a>
              </li>
            </ul>
          </div>

          <div
            className={`footer-section ${isVisible ? "animate-fade-in" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, "#about")}>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#calendar"
                  onClick={(e) => handleLinkClick(e, "#calendar")}
                >
                  Event Calendar
                </a>
              </li>
              <li>
                <a href="#blog" onClick={(e) => handleLinkClick(e, "#blog")}>
                  Community Blog
                </a>
              </li>
              <li>
                <a
                  href="#newsletter"
                  onClick={(e) => handleLinkClick(e, "#newsletter")}
                >
                  Newsletter Archive
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  onClick={(e) => handleLinkClick(e, "#resources")}
                >
                  Student Resources
                </a>
              </li>
            </ul>
          </div>

          <div
            className={`footer-section ${isVisible ? "animate-fade-in" : ""}`}
            style={{ animationDelay: "0.4s" }}
          >
            <h3>Contact Info</h3>
            <div className="contact-info">
              <p>📍 Student Union Building, Room 205</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ engage@university.edu</p>
              <p>🕒 Mon-Fri: 9AM-5PM</p>
            </div>
            <ul>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                >
                  Contact Form
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  onClick={(e) => handleLinkClick(e, "#support")}
                >
                  Get Support
                </a>
              </li>
              <li>
                <a
                  href="#feedback"
                  onClick={(e) => handleLinkClick(e, "#feedback")}
                >
                  Submit Feedback
                </a>
              </li>
            </ul>

            <div className="social-links">
              <a
                href="#"
                className="social-link"
                aria-label="Instagram"
                onClick={(e) =>
                  handleLinkClick(e, "https://instagram.com/yourcampus")
                }
              >
                📷
              </a>
              <a
                href="#"
                className="social-link"
                aria-label="Twitter"
                onClick={(e) =>
                  handleLinkClick(e, "https://twitter.com/yourcampus")
                }
              >
                🐦
              </a>
              <a
                href="#"
                className="social-link"
                aria-label="Facebook"
                onClick={(e) =>
                  handleLinkClick(e, "https://facebook.com/yourcampus")
                }
              >
                📘
              </a>
              <a
                href="#"
                className="social-link"
                aria-label="TikTok"
                onClick={(e) =>
                  handleLinkClick(e, "https://tiktok.com/@yourcampus")
                }
              >
                🎵
              </a>
              <a
                href="#"
                className="social-link"
                aria-label="Discord"
                onClick={(e) =>
                  handleLinkClick(e, "https://discord.gg/yourcampus")
                }
              >
                🎮
              </a>
            </div>
          </div>

          <div
            className={`footer-section ${isVisible ? "animate-fade-in" : ""}`}
            style={{ animationDelay: "0.6s" }}
          >
            <h3>Stay Connected</h3>
            <p
              style={{
                color: "#cccccc",
                fontSize: "14px",
                marginBottom: "15px",
              }}
            >
              Never miss campus events, community updates, and engagement
              opportunities!
            </p>
            <form className="newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Join Community</button>
            </form>
          </div>
        </div>

        <div
          className={`footer-bottom ${isVisible ? "animate-fade-in" : ""}`}
          style={{ animationDelay: "0.8s" }}
        >
          <p>&copy; 2025 Campus Community Engagement. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy" onClick={(e) => handleLinkClick(e, "#privacy")}>
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => handleLinkClick(e, "#terms")}>
              Terms of Use
            </a>
            <a
              href="#accessibility"
              onClick={(e) => handleLinkClick(e, "#accessibility")}
            >
              Accessibility
            </a>
            <a href="#conduct" onClick={(e) => handleLinkClick(e, "#conduct")}>
              Code of Conduct
            </a>
            <a
              href="#title-ix"
              onClick={(e) => handleLinkClick(e, "#title-ix")}
            >
              Title IX
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
