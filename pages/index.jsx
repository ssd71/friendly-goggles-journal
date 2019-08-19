import React from 'react';
import Link from 'next/link';
import '../styles/index.css';

const Index = () => (
  <div className="wrapper">
    <div className="block">
      <h1 className="greetText">Welcome</h1>
      <Link href="/login">
        <input type="button" className="loginbtn" value="Log in?" />
      </Link>
      <Link href="/signup">
        <input type="button" className="signupbtn" value="Sign up?" />
      </Link>
    </div>
  </div>
);

export default Index;
