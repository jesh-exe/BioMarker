import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BioMarkerHome from './components/BioMarker/BioMarkerHome';




function App() {


  return (
    <div className="App bg-light">
      {/* <Header></Header> */}
      <Routes>
        {/* <Route path='/' element={<MainPage></MainPage>}></Route> */}
        <Route path='/' element={<BioMarkerHome></BioMarkerHome>}></Route>
       
      </Routes>
      {/* <Footer></Footer> */}
      <ToastContainer className="mt-5 pt-2" />
    </div>
  );
}

export default App;