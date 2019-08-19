import React from 'react';
import components from '../components';

const { FormContainer } = components.Containers.User;

const loginForm = () => (
  <FormContainer
    purpose="Log in"
    submitAction="/login"
    submitText="Log in"
  >
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
          type="password"
          id="password"
          placeholder="Enter your password"
          value={userdata.password}
          onChange={(event) => setuserdata({ ...userdata, password: event.target.value })}
        />
        <br />
      </>
    )}
  </FormContainer>
);

export default loginForm;
