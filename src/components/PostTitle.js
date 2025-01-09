import React from 'react';
import ReactMarkdown from 'react-markdown';

const PostTitle = ({ post, isActive, onClick }) => {
  // Clean and deduplicate URLs, convert gallery URLs to direct image URLs
  const imageUrls = post.imageUrl 
    ? [...new Set(post.imageUrl.split(','))]
      .map(url => url.trim())
      .filter(url => url.length > 0)
      .map(url => {
        // Convert imgur gallery URLs to direct image URLs
        if (url.includes('imgur.com/gallery/')) {
          return url.replace('imgur.com/gallery/', 'i.imgur.com/') + '.jpg';
        }
        return url;
      })
    : [];

  return (
    <div 
      className={`dev-post ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      {isActive && (
        <div className="expanded-content">
          <div className="markdown-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          {imageUrls.length > 0 && (
            <div className="image-gallery">
              {imageUrls.map((url, index) => (
                <img 
                  key={index}
                  src={url} 
                  alt={`${post.title} - image ${index + 1}`}
                  style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostTitle;