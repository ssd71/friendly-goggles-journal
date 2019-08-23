import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DashboardContainer = (props) => {
  const {
    posts,
    children,
    isLoading,
  } = props;

  const [queryPosts, setQueryPosts] = useState([]);

  const [user, setUser] = useState('');
  useEffect(() => {
    fetch('/api/user', {
      headers: {
        cookie: document.cookie,
      },
    })
      .then((res) => res.text())
      .then((username) => setUser(username));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (searchQuery) {
      setQueryPosts(posts.filter((post) => post.content.includes(searchQuery)));
    } else {
      setQueryPosts(posts);
    }
  }, [searchQuery, posts]);

  return (
    <>
      {
        children({
          searchQuery,
          setSearchQuery,
          queryPosts,
          isLoading,
          user,
        })
      }
    </>
  );
};

DashboardContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  children: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default DashboardContainer;
