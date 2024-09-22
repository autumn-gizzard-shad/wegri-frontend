import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import KaKao from './map/kakaomap';
import TakePhotoPage from './map/takePhotoPage';

function App() {
  return ( 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/map" element={<KaKao map_id={1}></KaKao>}/>
          <Route path="/map/photo" element={<TakePhotoPage></TakePhotoPage>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
