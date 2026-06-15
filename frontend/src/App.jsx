import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import Requests from './pages/Requests'
import ResourceBoard from './pages/ResourceBoard'
import Roadmap from './pages/Roadmap'
import SkillLoops from './pages/SkillLoops'

const Protected = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to='/login' />
}

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='browse' element={<Browse />} />
        <Route path='profile' element={<Protected><Profile /></Protected>} />
        <Route path='requests' element={<Protected><Requests /></Protected>} />
        <Route path='resources/:matchId' element={<Protected><ResourceBoard /></Protected>} />
        <Route path='roadmap' element={<Protected><Roadmap /></Protected>} />
        <Route path='loops' element={<Protected><SkillLoops /></Protected>} />
      </Route>
    </Routes>
  )
}