import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Radio from './components/functionalcomponents/radio'
import Header from './components/functionalcomponents/Header';
import TamilRadioApp from './components/functionalcomponents/TamilRadio';
function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Radio />}></Route>
      <Route path="/tamil" element={<TamilRadioApp />}></Route>  
      </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App;
