import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';

const Dashboard = (props) => {
  const {
    searchQuery,
    setSearchQuery,
    queryPosts,
    user,
    children,
  } = props;
  return (
    <div className="grid-container">
      <header className="header">
        <div>
          <div className="greeting">
          Friendly Goggles |
          </div>
          <label htmlFor="searchbar">
            <input
              className="header__search"
              type="text"
              placeholder="Search"
              id="searchbar"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <Link href="/post">
            <input type="button" className="createbtn" value="+" />
          </Link>
        </div>
        <div className="usertext">
          {user ? `Hey ${user}! ` : ' '}
          <input
            className="signoutbtn"
            type="button"
            value="Sign out"
            onChange={
              () => {
                fetch('/logout', {
                  headers: {
                    cookie: document.cookie,
                  },
                });
                Router.push({
                  pathname: '/login',
                });
              }
            }
          />
        </div>
      </header>
      {children({ posts: queryPosts })}
    </div>
  );
};

Dashboard.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  queryPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  children: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default Dashboard;
