import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// pages
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';

// components
import Header from './components/Header';
import Container from './components/Container';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Container>
          <Switch>
            <Route path='/product'>
              <CreateProduct />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Container>
      </>
    </Router>
  );
}

export default App;
