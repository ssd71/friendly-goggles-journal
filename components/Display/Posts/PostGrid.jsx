import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostGrid = (props) => {
  const { posts } = props;
  return (
    <main className="post-main">
      {
      posts.map((post) => {
        const { id } = post;
        return (
          <div className="post" key={id} style={{ backgroundColor: 'white' }}>
            <div className="post__options">
              <Link href={`/api/deletepost/${id}`}>
                <label htmlFor="deletebtn" className="deletebtn">
                  <input
                    type="button"
                    id="deletebtn"
                  />
                  ✕
                </label>
              </Link>
            </div>
            <Link href="/post/[pid]" as={`/post/${post.id}`}>
              <h3 className="post-title">{post.title}</h3>
            </Link>
            <div className="post-content">
              {post.content.slice(0, 329)}
              {post.content.length > 330 ? '...' : ''}
            </div>
          </div>
        );
      })
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