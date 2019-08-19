import React from 'react';
import components from '../components';

const { FormContainer } = components.Containers.User;

const signupForm = () => (
  <FormContainer purpose="Create an account" submitAction="/signup" submitText="Submit">
    {({ userdata, setuserdata }) => (
      <>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={userdata.email}
          onChange={(event) => setuserdata({ ...userdata, email: event.target.value })}
        />
        <br />
        <input
          type="text"
          id="username"
          placeholder="Enter a username"
          value={userdata.username}
          onChange={(event) => setuserdata({ ...userdata, username: event.target.value })}
        />
        <br />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={userdata.password}
          onChange={(event) => setuserdata({ ...userdata, password: event.target.value })}
        />
        <br />
        <input
          type="password"
          id="passwordConf"
          placeholder="Confirm password"
          value={userdata.passwordConf}
          onChange={(event) => setuserdata({ ...userdata, passwordConf: event.target.value })}
        />
        <br />
      </>
    )}
  </FormContainer>
);

export default signupForm;
