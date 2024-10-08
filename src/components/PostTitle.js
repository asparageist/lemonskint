import React from 'react';

const PostTitle = ({ post, onClick, isActive}) => {
  return (
    <div className={`dev-post ${isActive ? 'active' : ''}`} onClick={onClick}>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <p>{new Date(post.timestamp).toLocaleString()}</p>
      {isActive && (
        <div className='expanded-content'>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{width:'50%', marginTop: '10px' }}/>}
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
};

export default PostTitle;