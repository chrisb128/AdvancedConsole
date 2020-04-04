import React from 'react';
import { useSelector } from 'react-redux';
import Auth from './modules/auth/Auth';
import Server from './modules/server/Server';

import { selectAuthenticated } from './modules/auth/reducer';

import './App.css';


function App() {

    const authenticated = useSelector(selectAuthenticated);
    
    return (
        <div className="App">
            {authenticated
            ?<Server/>
            :<Auth/>   
            }
        </div>
  );
}

export default App;
