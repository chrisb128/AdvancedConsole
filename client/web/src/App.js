import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    <div className="App">
      <Auth/>   
      { authenticated ? <Server/> : null }
    </div>
  );
}

export default App;
