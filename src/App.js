import Administrador from './Home/Administrador';
import Home from './Home/Home';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Administrador />} />
      </Routes>

    </div>
  );
}

export default App;
