import React from 'react';
import { Link } from 'react-router-dom';

import styles from './PostGrid.module.css';

const PostGrid = (props) => {

  const { id, title, thumbnail } = props;

  return (
    <div className={styles.Wrapper}>
      <Link to={`post/${id}`}>
        <div className={styles.Post}>

          <h2 className={styles.Title}>
            {title}
          </h2>

          <picture>
            <img src={thumbnail} alt={title} />
          </picture>

        </div>
      </Link>
    </div >
  )
}

export default PostGrid;
