import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Registry from './pages/Registry';
import Wallet from './pages/Wallet'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registry" element={<Registry />} />
      <Route path="/wallet" element={<Wallet />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
