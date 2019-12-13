import React from 'react';
import styles from './Auth.module.css';
import { withRouter } from 'react-router-dom';

import LoginForm from '../LoginForm/LoginForm.jsx';

const Auth = () => {

  return (
    <div className={styles.Auth}>
      <h2>Please log in</h2>
      <LoginForm />
    </div >
  );

}

export default withRouter(Auth);
