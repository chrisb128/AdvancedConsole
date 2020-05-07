import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Auth from './modules/auth/Auth';
import Server from './modules/server/Server';

import { selectAuthenticated } from './modules/auth/reducer';

import './App.css';


function App() {

  useEffect(() => {
    document.title = 'Advanced Console';
  });
  
  const authenticated = useSelector(selectAuthenticated);
  
  return (
    <Container fluid className="App">
      <Row className="Auth">
        <Col>
          <Auth/>
        </Col>        
      </Row>
      <Row>
        <Col>
          { authenticated 
            ? <Server/> 
            : null 
          }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
