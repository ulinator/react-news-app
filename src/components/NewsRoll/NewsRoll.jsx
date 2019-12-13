import React from 'react';
import Posts from '../Posts/Posts.jsx';

import { withRouter } from 'react-router-dom';
import { getPosts } from '../../utils/helpers.js';

import { Pagination, Select } from 'antd';
import 'antd/dist/antd.css';
import styles from './NewsRoll.module.css';

class NewsRoll extends React.Component {

  state = {
    view: 'list',
    posts: '',
    auth: '',
    page: this.props.match.params.id || 1,
    pages: 1,
    order: 'asc',
    orderBy: 'date'
  }

  switchView = (value) => {
    this.setState({
      view: value
    })
  }

  switchOrder = (value) => {
    this.setState({
      order: value
    }, () => this.getData()
    )
  }

  switchOrderBy = (value) => {
    this.setState({
      orderBy: value
    }, () => this.getData()
    )
  }

  switchPagination = (value) => {
    this.props.history.push(`/${value}`)
    this.setState({
      page: value
    }, () => this.getData()
    )
  }

  async getData() {
    const { auth, page, order, orderBy } = this.state;
    const { id } = this.props.match.params;

    let currentPage = id ? id : page;

    try {
      const response = await getPosts(currentPage, order, orderBy, auth);

      if (response.ok) {
        const json = await response.json();
        const { data, pagination } = json;
        this.setState({
          posts: data,
          pages: pagination.totalPages
        })
      }

    } catch (error) {
      console.log(error);
    }

  }

  async componentDidMount() {
    const { token } = this.props;
    this.setState({
      auth: token
    }, () => {
      this.getData()
    });

  }

  render() {
    const { Option } = Select;

    const { view, posts } = this.state;

    return (
      <div className={styles.Wrapper}>
        <div className={styles.Filters}>
          <Select
            name="order"
            defaultValue="asc"
            onChange={this.switchOrder}>
            <Option value="asc">Sort ascending</Option>
            <Option value="desc">Sort descending</Option>
          </Select>

          <Select
            name="orderBy"
            defaultValue="date"
            onChange={this.switchOrderBy}>
            <Option value="date">Sort by date</Option>
            <Option value="title">Sort by title</Option>
          </Select>
          <Select
            className={styles.ViewSelect}
            name="view"
            defaultValue="list"
            onChange={this.switchView}>
            <Option value="list">List</Option>
            <Option value="grid">Grid</Option>
          </Select>
        </div>

        {posts !== "" &&
          <React.Fragment>
            <Posts
              posts={posts}
              view={view}
            />

            <Pagination
              className={styles.Pagination}
              current={Number(this.state.page)}
              total={Number(this.state.pages) * 10}
              onChange={this.switchPagination}
            />
          </React.Fragment>
        }

      </div>
    )
  }
}

export default withRouter(NewsRoll);
