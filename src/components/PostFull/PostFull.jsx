import React from 'react';
import { withRouter } from 'react-router-dom';
import { getComments, getPost, putTime } from './../../utils/helpers.js';
import { Button, Icon } from 'antd';
import Author from '../Author/Author.jsx';
import Modal from '../Modal/Modal.jsx';
import Comment from '../CommentForm/CommentForm.jsx';

import styles from './PostFull.module.css';

class PostFull extends React.Component {

  state = {
    post: "",
    isLoading: true,
    author: false,
    commenting: false,
    commentId: 1,
    comments: false,
    sessionBegins: false
  }

  async componentDidMount() {
    const { token } = this.props;
    const { id } = this.props.match.params;
    const time = Date.now();

    this.setState({
      sessionBegins: time,
      isLoading: true,
      auth: token
    }, async () => {
      try {
        const response = await getPost(id, token);

        if (response.ok) {
          const json = await response.json();
          const { data } = json;
          this.setState({
            post: data,
            isLoading: false
          })
        }

      } catch (error) {
        console.log(error);
        this.setState({
          isLoading: false
        })
      }

      this.loadComments();
    })

  }

  async componentWillUnmount() {
    const { id } = this.props.match.params;
    const { sessionBegins, auth } = this.state;
    const time = Date.now();

    const totalTime = time - sessionBegins;

    try {
      const response = await putTime(id, totalTime, auth);

      if (response.ok) {
        const json = await response.json();
      }

    } catch (error) {
      console.log(error);
    }

  }

  postComment = () => {
    this.setState({
      commenting: true
    })
  }

  loadComments = async () => {
    const { auth } = this.state;
    const { id } = this.props.match.params;

    try {
      const response = await getComments(id, auth);

      if (response.ok) {
        const json = await response.json();
        const { data } = json;
        this.setState({
          comments: data,
          isLoading: false
        })
      }

    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false
      })
    }
  }

  hideAuthor = () => {
    this.setState({
      author: false
    })
  }

  hideComment = () => {
    this.setState({
      commenting: false
    })
  }

  submitComment = () => {
    this.setState({
      commenting: false
    })
    this.loadComments();
  }

  handleAuthor = () => {
    this.setState(prevState => ({
      author: !prevState.author
    }));
  }

  render() {
    const { post, isLoading, author, commenting, comments } = this.state;

    if (isLoading) {
      return <h2>Loading...</h2>
    } else {
      return (
        <div className={`${styles.Post}`}>
          <h2>
            {post.title}
          </h2>
          <picture className="Post-picture">
            <img src={post.thumbnail} alt={post.title} />
          </picture>
          <div className={styles.PostMeta}>
            <p>{post.date}</p>
            <Button
              onClick={this.handleAuthor}>
              <Icon type="info-circle" />
            </Button>
          </div>

          <p className={styles.Content}>
            {post.content}
          </p>

          {author &&
            <Modal>
              <Author
                id={post.authorId}
                auth={this.state.auth}
                hide={this.hideAuthor} />
            </Modal>}

          <Button
            type="primary"
            onClick={this.postComment}>
            Comment
          </Button>

          {comments &&
            <ul className={styles.CommentsList}>{this.state.comments.map((comment, index) => {
              return (
                <li key={index}>
                  <h2><Icon type="user" className={styles.Icon} />{comment.name}</h2>
                  <p><Icon type="message" className={styles.Icon} />{comment.comment}</p>
                </li>
              )
            })}
            </ul>
          }

          {commenting &&
            <Modal>
              <div className="Comment">
                <h2>Add Comment</h2>
                <Comment
                  id={post.id}
                  auth={this.state.auth}
                  hide={this.hideComment}
                  submit={this.submitComment} />
              </div>
            </Modal>}

        </div >
      );
    }

  }
}

export default withRouter(PostFull);
