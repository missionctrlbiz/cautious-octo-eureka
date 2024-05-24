import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dark from './pages/Dark';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {

  const themeMode = useSelector((state) => state.image.themeMode);
  useEffect(() => {

    var head = document.head;
    var link; 

    if (themeMode === "dark") {
        
      link = document.createElement("link");

        link.id = "darkcss";
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = `assets/css/dark.css`;

        head.appendChild(link);
        return () => { head.removeChild(link); }
    } else {
      link = document.getElementById("darkcss");
        
        if (link != null) head.removeChild(link);
    }
}, [themeMode]);

  return (
    <>
      <div>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/dark' element={ <Dark /> } />
      </Routes>
      </div>
    </>
  );
}

export default App;
