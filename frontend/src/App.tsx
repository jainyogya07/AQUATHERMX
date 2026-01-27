
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Console from './pages/Console';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/console" element={<Console />} />
      </Routes>
    </Router>
  );
}

export default App;
