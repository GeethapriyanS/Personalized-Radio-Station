import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Radio from './components/functionalcomponents/Radio';
import Header from './components/functionalcomponents/Header';
import TamilRadioApp from './components/functionalcomponents/TamilRadio';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Radio />}></Route>
      <Route path="/tamil" element={<TamilRadioApp />}></Route>  
      </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App;
