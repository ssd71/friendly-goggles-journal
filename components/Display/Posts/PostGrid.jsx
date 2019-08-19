import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostGrid = (props) => {
  const { posts } = props;

  const deleteHandler = (event) => {
    const pid = event.target.id.slice(9);
    console.log(pid);
    fetch(`/api/deletepost/${pid}`, {
      headers: {
        cookie: document.cookie,
      },
    });
    document.getElementById(`post${pid}`).style.display = 'none';
  };

  return (
    <main className="post-main">
      {
      posts.map((post) => (
        <div className="post" key={post.id} id={`post${post.id}`} style={{ backgroundColor: 'white' }}>
          <div className="post__options">
            <label htmlFor={`deletebtn${post.id}`} className="deletebtn">
              <input
                type="button"
                id={`deletebtn${post.id}`}
                onClick={deleteHandler}
              />
                  ✕
            </label>
          </div>
          <Link href="/post/[pid]" as={`/post/${post.id}`}>
            <h3 className="post-title">{post.title}</h3>
          </Link>
          <div className="post-content">
            {post.content.slice(0, 329)}
            {post.content.length > 330 ? '...' : ''}
          </div>
        </div>
      ))
}
    </main>
  );
};

PostGrid.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default PostGrid;
