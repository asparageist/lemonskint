import React from 'react';
import ReactMarkdown from 'react-markdown';

const PostTitle = ({ post, isActive, onClick }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const imageUrls = post.imageUrl 
    ? [...new Set(post.imageUrl.split(','))]
      .map(url => url.trim())
      .filter(url => url.length > 0)
      .map(url => url.includes('imgur.com/gallery/') 
        ? url.replace('imgur.com/gallery/', 'i.imgur.com/') + '.jpg'
        : url
      )
    : [];

  return (
    <div className={`dev-post ${isActive ? 'active' : ''}`} onClick={onClick}>
      <h2>{post.title}</h2>
      <div className="post-meta">
        {post.timestamp && <span className="timestamp">{formatDate(post.timestamp)}</span>}
      </div>
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