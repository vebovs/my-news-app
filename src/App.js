import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

import './App.css';
import 'bulma/css/bulma.css';

import Home from './components/Home/home';
import Edit from './components/Edit/edit';
import Post from './components/Post/post';

import postService from './services/post.service';

function App() {

  const [busy, setBusy] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getPosts()
    .then(data => {
      setPosts(data);
      setBusy(false);
    })
    .catch(error => console.log(error));
  }, []);

  const edit = (id, title, text) => {
    postService.updatePost({
      id: id,
      title: title,
      text: text
    })
    .then(() => {
      posts.map((e) => {
        if(e.id === id) {
          e.title = title;
          e.text = text;
        }
        return e;
      });
    })
    .catch(error => console.log(error));    
  }

  const remove = (id) => {
    postService.deletePost(id)
    .then(() => {
      setPosts(posts.filter(e => e.id !== id));
    })
    .catch(error => console.log(error));
  }

  const post = (title, text) => {
    postService.setPost({
      title: title,
      text: text
    })
    .then(data => {
      setPosts(posts => [...posts, data]);
    })
    .catch(error => console.log(error));
  }

  return (
    <Router>
        <div className='container'>
          <nav className='navbar' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
              <Link className='navbar-item' to='/'>My News App</Link>
            </div>
            <div className='navbar-end'>
              <Link className='navbar-item' to='/post'>Post</Link>
            </div>
          </nav>
        </div>
        { !busy &&
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} remove={remove} posts={posts} />} />
            <Route path='/edit' render={(props) => <Edit {...props} edit={edit} />} />
            <Route path='/post' render={(props) => <Post {...props} post={post} />} />
          </Switch>
        }
    </Router>
  );
}

export default App;
