import React, { useEffect, useState } from 'react';
import PostTitle from './PostTitle';
import NewPost from './NewPost';

const SkintLog = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const togglePost = (id) => {
    setExpandedPosts((prevExpanded) => 
      prevExpanded.includes(id) ? prevExpanded.filter((postId) => postId !== id) : [...prevExpanded, id]
    );
  };

  const addPost = (newPost) => {
    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const timestamp = new Date().toISOString();
    const updatedPost = { ...newPost, id: newId, timestamp };

    console.log('post this:', updatedPost);

    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('New post added:', data);
        setPosts([...posts, data]);
      })
      .catch((err) => console.error('Error adding post', err));
  };

  const deletePost = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
    }).then(() => setPosts(posts.filter((post) => post.id !== id)));
  };

  return (
    <div className="dev-log">
      <h1>DEV LOG</h1>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? 'LOGOUT' : 'LOGIN'}
      </button>
      
      {isAdmin && <NewPost addPost={addPost} />}

      {[...posts].reverse().map((post) => (
        <div key={post.id}>
          <PostTitle
            post={post}
            isActive={expandedPosts.includes(post.id)}
            onClick={() => togglePost(post.id)}
          />
          {isAdmin && <button onClick={() => deletePost(post.id)}>DELETE</button>}
        </div>
      ))}
    </div>
  );
};

export default SkintLog;
