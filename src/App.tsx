import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
const { ipcRenderer } = window.require('electron');

function App() {
  const [version, setVersion] = useState('');

  useEffect( () => {
    if( ipcRenderer ){
      ipcRenderer.on('app_version', (event: any, { version }: any) => {
        ipcRenderer.removeAllListeners('app_version');
        setVersion(version);
      });
      ipcRenderer.send('app_version');
    }else{
      console.log('ipcRenderer missing!');
    }
  }, [ipcRenderer]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {`App version: ${version}`}
        </a>
      </header>
    </div>
  );
}

export default App;
