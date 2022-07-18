import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Wallet from './pages/Wallet'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/wallet" element={<Wallet />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
