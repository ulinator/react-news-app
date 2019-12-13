import React from 'react';
import styles from './Posts.module.css';

import Post from '../Post/Post.jsx';

const PostsList = (props) => {

  const { posts, view } = props;

  return (
    <div className={`${styles.PostList} ${view === "list" ? `${styles.List}` : `${styles.Grid}`}`}>
      {
        posts.map((post) => {
          return (
            <Post
              view={view}
              key={post.id}
              {...post} />
          )
        })
      }
    </div>
  )
}

export default PostsList;
