import React from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Modal}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal;
