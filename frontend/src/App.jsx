import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import CreateRoom from './Pages/CreateRoom'
import JoinRoom from './Pages/JoinRoom'
import Dashboard from './Pages/Dashboard'
import GuestRoom from './Pages/GuestRoom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room/:code" element={<GuestRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App