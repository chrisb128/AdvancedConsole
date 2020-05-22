import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Auth from './modules/auth/Auth';
import Home from './modules/home/Home';

import './App.css';
import { load } from './modules/auth/actions';
import { selectLoaded } from './modules/auth/reducer';
import { selectAuthenticated } from './modules/auth/reducer';

import history from './app/history';


function App() {
  const dispatch = useDispatch();
  const loaded = useSelector(selectLoaded)
  const authenticated = useSelector(selectAuthenticated);

  useEffect(() => {
    document.title = 'Advanced Console';
  });

  useEffect(() => {
    dispatch(load());
  }, [dispatch]);
  
  return (
    <Router history={history}>
      <Container fluid className="App">
        <Row>
          <Col>
            { !loaded 
              ? <p>Loading...</p>
              :<Switch>
                <Route path="/client/auth">
                  <Auth/>
                </Route>
                <Route path="/client">
                  { authenticated ? null : <Redirect to="/client/auth/login"/> }
                  <Home/>
                </Route>
                <Route exact path="/">
                  { authenticated ? <Redirect to="/client"/> : <Redirect to="/client/auth/login"/> }                  
                </Route>
              </Switch>
            }
          </Col>
        </Row>
      </Container>
    </Router>
  );
}


export default App;
