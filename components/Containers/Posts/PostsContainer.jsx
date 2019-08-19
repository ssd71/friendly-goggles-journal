import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

const PostsContainer = (props) => {
  const { children } = props;

  const [isLoading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const { cookie } = document;
    // fetch(`http://${window.location.host}/api/posts`, {
    fetch('/api/posts', {
      headers: {
        cookie,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPosts(data);
      });
  }, []);

  return (
    <>
      {children({ posts, isLoading })}
    </>
  );
};

PostsContainer.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PostsContainer;
