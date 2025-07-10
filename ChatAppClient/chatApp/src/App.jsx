import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import Username from './Pages/Username.jsx';


function App() {

  return (
    <>
      <div className="App">
        <h3>testing</h3>
        <Router>
          <Routes>
            <Route path="/login" element={<Username />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
