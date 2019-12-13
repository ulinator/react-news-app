import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Author from '../Author/Author.jsx';
import Modal from '../Modal/Modal.jsx';
import { Button, Icon } from 'antd';

import styles from './PostList.module.css';

const PostList = (props) => {

  const [excerptOn, toggleExcerpt] = useState(false);
  const [authorOn, toggleAuthor] = useState(false);

  const { id, authorId, date, title, thumbnail, excerpt } = props;

  const hideAuthor = () => {
    toggleAuthor(false);
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Post}>
        <header className={styles.Header}>
          <p>{date}</p>
          <Link to={`post/${id}`}>
            <h2 className={styles.Title}>
              {title}
            </h2>
          </Link>
        </header>

        <picture className={styles.Picture}>
          <img src={thumbnail} alt={title} />
        </picture>

        <div className={styles.Meta}>
          <Button
            className={styles.Button}
            onClick={() => toggleAuthor(!authorOn)}>
            <Icon type="info-circle" />
          </Button>
          <Button
            className={`${styles.Button} ${authorOn === true ? `${styles.open}` : null}`}
            onClick={() => toggleExcerpt(!excerptOn)}>
            <Icon type="more" />
          </Button>
        </div>
      </div>

      <div className={`${styles.Content} ${excerptOn === true ? `${styles.open}` : null}`}>
        <p>
          {excerpt}
        </p>
        <Button
          className={`${styles.Button} ${styles.close}`}
          onClick={() => toggleExcerpt(!excerptOn)}>close</Button>
      </div>

      {authorOn &&
        <Modal>
          <Author
            id={authorId}
            hide={hideAuthor}
          />
        </Modal>}

    </div>
  )
}

export default PostList;
