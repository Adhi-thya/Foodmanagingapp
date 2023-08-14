
import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Homepage from './Pages/Homepage/Index';

import './App.css'
function App() {
  return (
    <div  className='App'>
<Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
