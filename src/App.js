import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth.jsx';
import Header from './components/Header/Header.jsx';
import NewsRoll from './components/NewsRoll/NewsRoll.jsx';
import PostFull from './components/PostFull/PostFull.jsx';

class App extends React.Component {
  state = {
    token: null
  }

  getStoredToken = () => {
    let token = JSON.parse(localStorage.getItem('token'));

    this.setState({
      token
    })
  }

  componentDidMount() {
    this.getStoredToken();
  }

  render() {
    const { token } = this.state;

    if (!token) {
      return (
        <Router>
          <Route path="/">
            <Auth />
          </Route>
        </Router>
      )
    } else {
      return (
        <Router>
          <div className="App">
            <Header />

            <Switch>
              <Route exact path="/" component={() => <NewsRoll token={token} />} />
              <Route exact path="/:id" component={() => <NewsRoll token={token} />} />
              <Route exact path="/post/:id" component={() => <PostFull token={token} />} />
              <Route path="/" component={() => <NewsRoll token={token} />} />
            </Switch>

          </div>
        </Router>
      );
    }

  }
}

export default App;
