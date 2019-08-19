import React from 'react';
import PropTypes from 'prop-types';
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
          <Link href="/createpost">
            <input type="button" className="createbtn" value="+" />
          </Link>
        </div>
        <div className="usertext">
          {user ? `Hey ${user}! ` : ' '}
          <Link href="/logout">
            <input
              className="signoutbtn"
              type="button"
              value="Sign out"
            />
          </Link>
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
