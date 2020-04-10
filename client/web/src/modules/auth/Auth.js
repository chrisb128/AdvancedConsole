import React from 'react';
import { useSelector } from 'react-redux';
import Login from './login/Login';

import { selectAuthenticated, selectUserName } from './reducer';

import styles from './Auth.module.css';

const Auth = () => {
  const userName = useSelector(selectUserName);
  const authenticated = useSelector(selectAuthenticated);

  return (
    <div className={styles.auth}>
    {
      !authenticated
      ? (<Login/>)
      : (<span className={styles.loggedIn}>Logged in as: { userName }</span>)
    }
    </div>
  );
};

export default Auth;