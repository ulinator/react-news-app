import React from 'react';

import { withRouter } from 'react-router-dom';

import styles from './Header.module.css';

const Header = (props) => {
  const { history } = props;

  const logoutHandler = () => {
    localStorage.removeItem('token');
    history.push('/Login');
  }

  return (
    <div className={styles.Header}>
      <div className={styles.Wrapper}>
        <a href="/1">Home</a>
        <h1>Simple news app</h1>
        <a href="" onClick={logoutHandler}>Logout</a>
      </div>
    </div >
  )
}

export default withRouter(Header);
