import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from './components/functionalcomponents/Header';
import TamilRadioApp from './components/functionalcomponents/TamilRadio';
import RadioBox from './components/functionalcomponents/RadioBox';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<RadioBox />}></Route>
      <Route path="/tamil" element={<TamilRadioApp />}></Route>  
      </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App;
