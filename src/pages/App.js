import logo from '../assets/logo.svg';
import '../styles/App.css';
import MainMenu from './mainMenu/MainMenu';
import LoginIndex from './login/LoginIndex';
import {Routes,Router,Route,BrowserRouter} from "react-router-dom"
import MoreView from './mainMenu/MoreMenu';
import LikedMenu from './mainMenu/LikedMenu';
import Mypage from './myPage/Mypage';
import PointExchange from './myPage/PointExchange';
import KaKao from './map/kakaomap';
import TakePhotoPage from './map/takePhotoPage';


function App() {
  return (
  
    <BrowserRouter>
    
          <Routes>
            <Route path='/' element={<LoginIndex></LoginIndex>}/>
            <Route path='/main' element={<MainMenu></MainMenu>}/>
            <Route path='/more' element={<MoreView></MoreView>}/>
            <Route path='/liked' element={<LikedMenu></LikedMenu>}/>
            <Route path='/mypage' element={<Mypage></Mypage>}/>
            <Route path='/point' element={<PointExchange></PointExchange>}/>
            <Route path="/map" element={<KaKao></KaKao>}/>
            <Route path="/map/photo" element={<TakePhotoPage></TakePhotoPage>}/>


          </Routes>


    </BrowserRouter>
    
  );
}

export default App;
