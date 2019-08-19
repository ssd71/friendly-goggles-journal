import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import '../../../styles/authform.css';

const PostFormContainer = (props) => {
  const {
    purpose,
    submitAction,
    children,
    pid,
  } = props;

  const [message, setMessage] = useState('');

  const [postdata, setPostdata] = useState({
    title: '',
    content: '',
  });
  useEffect(() => {
    fetch(`http://${window.location.host}/api/post/${pid}`, {
      headers: {
        cookie: document.cookie,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPostdata(data);
      }).catch((err) => {
        console.log(err);
        setMessage('Couldn\'t process your request at the moment.');
      });
  }, [pid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(`http://${window.location.host}${submitAction}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postdata),
    }).then((res) => {
      document.cookie = res.headers.cookie;
      if (res.ok) {
        Router.push({
          pathname: '/dashboard',
        });
      } else {
        res.text().then((data) => console.log(data));
      }
    });
  };

  return (
    <div className="formwrapper">
      <h3>{purpose}</h3>
      <form method="post" onSubmit={handleSubmit} style={{ color: 'black' }}>
        {children({ postdata, setPostdata })}
        <br />
        <br />
        {message}
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

PostFormContainer.propTypes = {
  purpose: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  submitAction: PropTypes.string.isRequired,
  pid: PropTypes.number.isRequired,
};

export default PostFormContainer;
