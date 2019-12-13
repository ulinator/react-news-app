import React from 'react';

import PostList from '../../components/PostList/PostList.jsx';
import PostGrid from '../../components/PostGrid/PostGrid.jsx';

const Post = (props) => {
  const { view } = props;

  if (view === "list") {
    return <PostList {...props} />
  } else if (view === "grid") {
    return <PostGrid {...props} />
  } else {
    throw new Error("No view type recieved");
  }

}

export default Post;
