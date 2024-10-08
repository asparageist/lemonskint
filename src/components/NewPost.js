import React, { useState} from 'react';

const NewPost = ({ addPost }) => {
  const [title, setTitle] = useState ('');
  const [excerpt, setExcerpt] = useState ('');
  const [content, setContent] = useState ('');
  const [imageUrl, setImageUrl] = useState ('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && excerpt && content) {
      addPost({ title, excerpt, content, imageUrl });
      setTitle('');
      setExcerpt('');
      setContent('');
      setImageUrl('');
    }
  };

  return (
    <div className='new-post-form'>
      <h2>NEW POST</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Excerpt:</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">POST</button>
      </form>
    </div>
  );
};

export default NewPost;