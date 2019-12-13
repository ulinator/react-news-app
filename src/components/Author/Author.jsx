import React from 'react';
import { Button } from 'antd';

import { getAuthor } from '../../utils/helpers.js';
import styles from './Author.module.css';

class Author extends React.Component {

  state = {
    author: "",
  }

  async componentDidMount() {
    let { auth } = this.props;
    const { id } = this.props;

    if (!auth) {
      auth = JSON.parse(localStorage.getItem('token'));
    }

    this.setState({
      auth
    }, async () => {
      try {
        const response = await getAuthor(id, auth);

        if (response.ok) {
          const json = await response.json();
          const { data } = json;
          this.setState({
            author: data
          });
        }
      } catch (error) {
        console.log(error);
      }

    })
  }

  render() {
    const { author } = this.state;

    return (
      <div className={styles.Author}>
        <div className={styles.Wrapper}>
          <h2 className={styles.Name}>{author.name}</h2>
          <picture className={styles.Picture}>
            <img src={author.avatar} alt={author.name} />
          </picture>
        </div>

        <p className={styles.Description}>{author.description}</p>

        <Button onClick={this.props.hide}>
          close
        </Button>
      </div>
    )

  }
}

export default Author;
