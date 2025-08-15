import React, { useState } from "react";
import "./Feed.css"; // Import the CSS file

const Feed = () => {
  // State to manage posts in the feed
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alice Chen",
      authorAvatar: "https://via.placeholder.com/40/f4a460/ffffff?text=AC", // Placeholder for Alice's avatar
      time: "2 hours ago",
      imageUrl:
        "https://via.placeholder.com/700x400/87CEEB/FFFFFF?text=Campus+Connect+Design+Hub", // Image from your screenshot
      title: "Welcome to the Campus Connect Design Hub!", // Title from your screenshot
      content:
        "Hello everyone! 👋 I'm Alice, thrilled to kick off this journey with you. This space is all about bringing together creative minds who are passionate about UI/UX design, collaboration, learning, and sharing innovative ideas. Let's build something amazing together! Feel free to introduce yourselves and share what you're working on.", // Content from your screenshot
      likes: 128, // Likes from your screenshot
      comments: 32, // Comments from your screenshot
      shares: 15, // Shares from your screenshot
      likedByMe: false,
    },
    // You can add more initial posts here if needed
  ]);

  // State for the new post input
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null); // For image file
  const [newPostImagePreview, setNewPostImagePreview] = useState(""); // For image preview URL

  const handlePostContentChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewPostImage(null);
      setNewPostImagePreview("");
    }
  };

  const handlePostSubmit = () => {
    if (newPostContent.trim() || newPostImage) {
      const newPost = {
        id: posts.length + 1,
        author: "Your Name", // Replace with dynamic user data
        authorAvatar: "https://via.placeholder.com/40/6a5acd/ffffff?text=YN", // Replace with dynamic user avatar
        time: "Just now",
        imageUrl: newPostImagePreview,
        title: "", // New posts typically don't have a title unless added later
        content: newPostContent.trim(),
        likes: 0,
        comments: 0,
        shares: 0,
        likedByMe: false,
      };
      setPosts([newPost, ...posts]); // Add new post to the top
      setNewPostContent("");
      setNewPostImage(null);
      setNewPostImagePreview("");
    }
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.likedByMe ? post.likes - 1 : post.likes + 1,
              likedByMe: !post.likedByMe,
            }
          : post
      )
    );
  };

  return (
    <div className="feed">
      <div className="feed-container">
        <div className="feed-title">Personalized Feed</div>

        {/* Create New Post Section */}
        <div className="feed-createPost">
          <div className="feed-createPostHeader">
            <img
              src="https://via.placeholder.com/40/6a5acd/ffffff?text=ME"
              alt="Your Avatar"
              className="feed-createPostAvatar"
            />
            <input
              type="text"
              placeholder="Start a post..."
              className="feed-postInput"
              value={newPostContent}
              onChange={handlePostContentChange}
            />
            <label htmlFor="feed-imageUpload" className="feed-addPhotoButton">
              +
            </label>
            <input
              type="file"
              id="feed-imageUpload"
              className="feed-imageUploadInput"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          {newPostImagePreview && (
            <div className="feed-imagePreviewContainer">
              <img
                src={newPostImagePreview}
                alt="Post preview"
                className="feed-imagePreview"
              />
              <button
                onClick={() => setNewPostImagePreview("")}
                className="feed-removeImageButton"
              >
                x
              </button>
            </div>
          )}
          <button
            onClick={handlePostSubmit}
            className="feed-postButton"
            disabled={!newPostContent.trim() && !newPostImage}
          >
            Post
          </button>
        </div>

        {/* Feed Posts */}
        <div className="feed-posts">
          {posts.map((post) => (
            <div key={post.id} className="feed-postCard">
              <div className="feed-postHeader">
                <img
                  src={post.authorAvatar}
                  alt={`${post.author} Avatar`}
                  className="feed-postAuthorAvatar"
                />
                <div className="feed-postMeta">
                  <span className="feed-postAuthor">{post.author}</span>
                  <span className="feed-postTime">{post.time}</span>
                </div>
              </div>
              {post.imageUrl && (
                <div className="feed-postImageContainer">
                  <img
                    src={post.imageUrl}
                    alt="Post content"
                    className="feed-postImage"
                  />
                </div>
              )}
              {post.title && <h3 className="feed-postTitle">{post.title}</h3>}
              <p className="feed-postContent">{post.content}</p>
              <div className="feed-postActions">
                <span
                  className={`feed-actionButton ${
                    post.likedByMe ? "feed-actionButton-liked" : ""
                  }`}
                  onClick={() => handleLike(post.id)}
                >
                  ❤️ {post.likes} Likes
                </span>
                <span className="feed-actionButton">
                  💬 {post.comments} Comments
                </span>
                <span className="feed-actionButton">
                  🔗 {post.shares} Shares
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
