import React, { useEffect, useState, useRef } from 'react';
import PostTitle from './PostTitle';
import logo from '../images/lemonlogo.png';

const SkintLog = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [error, setError] = useState(null);
  const logoRef = useRef(null);

  // Lens flare effect
  const handleMouseMove = (e) => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      
      const centerX = rect.left + (rect.width / 2);
      const centerY = rect.top + (rect.height / 2);
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDistance = 400;
      const scale = Math.max(0, 1 - (distance / maxDistance));
      
      const mirrorX = centerX - mouseX;
      const mirrorY = centerY - mouseY;
      
      logoRef.current.style.setProperty('--x', `${mirrorX}px`);
      logoRef.current.style.setProperty('--y', `${mirrorY}px`);
      logoRef.current.style.setProperty('--scale', scale);
    }
  };

  const handleMouseLeave = () => {
    if (logoRef.current) {
      logoRef.current.style.setProperty('--scale', '0');
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://skintonline-api-production.up.railway.app/posts');
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('Data is not an array:', data);
          setPosts([]);
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
        setError('Failed to fetch posts');
      }
    };
    fetchPosts();
  }, []);

  const togglePost = (id) => {
    setExpandedPosts((prevExpanded) => 
      prevExpanded.includes(id) 
        ? prevExpanded.filter((postId) => postId !== id) 
        : [...prevExpanded, id]
    );
  };

  const sortedPosts = posts;

  return (
    <div className="dev-log">
      <div 
        className="logo-container" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={logoRef}
      >
        <img 
          src={logo} 
          alt="Skint Log Logo" 
          className="logo"
        />
        <div className="lens-flare"></div>
      </div>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {sortedPosts.map((post) => (
        <div key={post.id}>
          <PostTitle
            post={post}
            isActive={expandedPosts.includes(post.id)}
            onClick={() => togglePost(post.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default SkintLog;
