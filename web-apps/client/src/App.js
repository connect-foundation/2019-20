import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
// pages
import TmpChat from './pages/TmpChat';
import ChatRoom from './pages/ChatRoom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/chat'>
          <TmpChat />
        </Route>
        <Route path='/chat/room/:id'>
          <ChatRoom />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
