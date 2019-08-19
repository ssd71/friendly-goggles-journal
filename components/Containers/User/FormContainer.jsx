import React, { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

const FormContainer = (props) => {
  const {
    purpose, submitAction, submitText, children,
  } = props;
  const [userdata, setuserdata] = useState({
    email: '',
    password: '',
    username: '',
    passwordConf: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(submitAction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdata),
    }).then((res) => {
      document.cookie = res.headers.cookie;
      if (res.ok) {
        Router.push({
          pathname: '/dashboard',
        });
      } else {
        res.json().then((data) => setMessage(data.message));
      }
    });
  };

  return (
    <div className="formwrapper">
      <h3>{purpose}</h3>
      <form method="post" onSubmit={handleSubmit}>
        {children({ userdata, setuserdata })}
        <br />
        {message}
        <br />
        <input type="submit" value={submitText} />
      </form>
    </div>
  );
};

FormContainer.propTypes = {
  purpose: PropTypes.string.isRequired,
  submitAction: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default FormContainer;
