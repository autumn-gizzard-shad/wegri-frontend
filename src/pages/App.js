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
    </div>
  );
}

export default App;
