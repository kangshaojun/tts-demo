import React from 'react';
import './App.css';
import TTSTest from './components/TTSTest';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>文字转语音应用</h1>
      </header>
      <main>
        <TTSTest />
      </main>
      <footer>
        <p>文字转语音演示</p>
      </footer>
    </div>
  );
}

export default App;
