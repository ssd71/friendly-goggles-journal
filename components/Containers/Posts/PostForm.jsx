import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import '../../../styles/authform.css';

const PostFormContainer = (props) => {
  const Router = useRouter();
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
    if (pid !== -1) {
      fetch(`/api/post/${pid}`, {
        headers: {
          cookie: document.cookie,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPostdata(data);
        }).catch((err) => {
          console.log(err);
          // setMessage('Couldn\'t process your request at the moment.');
        });
    }
  }, [pid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(submitAction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postdata),
    }).then((res) => {
      if (res.ok) {
        Router.push({
          pathname: '/dashboard',
        });
      } else {
        res.text().then((data) => setMessage(data));
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
        <input
          type="submit"
          value="Submit"
          onClick={
            (event) => {
              event.target.style.disabled = true;
            }
          }
        />
      </form>
    </div>
  );
};

PostFormContainer.propTypes = {
  purpose: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  submitAction: PropTypes.string.isRequired,
  pid: PropTypes.number,
};

PostFormContainer.defaultProps = {
  pid: -1,
};

export default PostFormContainer;
