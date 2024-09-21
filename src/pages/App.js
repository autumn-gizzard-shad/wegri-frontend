import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import KaKao from './map/kakaomap';
import FloatingTakePhoto from './map/floatingTakePhoto';

function App() {
  return ( 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/map" element={<KaKao category="bicycle"></KaKao>}/>
          <Route path="/map/photo" element={<FloatingTakePhoto></FloatingTakePhoto>}/>
        </Routes>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
