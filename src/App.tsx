import React, {useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
const { ipcRenderer } = window.require('electron');

function App() {
  const [version, setVersion] = useState('');
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);

  const restartApp = useCallback( () => {
    ipcRenderer.send('restart_app');
  }, [])

  useEffect( () => {
    if( ipcRenderer ){
      ipcRenderer.on('app_version', (event: any, { version }: any) => {
        ipcRenderer.removeAllListeners('app_version');
        setVersion(version);
      });
      ipcRenderer.send('app_version');
      ipcRenderer.on('update_available', () => {
        ipcRenderer.removeAllListeners('update_available');
        setUpdateAvailable(true);
      });
      ipcRenderer.on('update_downloaded', () => {
        ipcRenderer.removeAllListeners('update_downloaded');
        setUpdateDownloaded(true);
      });
    }else{
      console.log('ipcRenderer missing!');
    }
  }, [ipcRenderer]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{`App version: ${version}`}</div>
        { updateAvailable && <div>Downloading update...</div> }
        { updateDownloaded && <div>
          <div onClick={restartApp}>Restart application</div>
        </div> }
      </header>
    </div>
  );
}

export default App;
