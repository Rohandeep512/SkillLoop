import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav className='border-b border-border-light dark:border-border-dark px-6 py-4 flex justify-between items-center'>
      <Link to='/' className='text-base font-semibold tracking-tight'>SkillLoop</Link>
      <div className='flex items-center gap-6'>
        <Link to='/browse' className='text-sm text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark'>Browse</Link>
        {user && <>
          <Link to='/loops' className='text-sm text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark'>Loops</Link>
          <Link to='/roadmap' className='text-sm text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark'>Roadmap</Link>
          <Link to='/requests' className='text-sm text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark'>Requests</Link>
          <Link to='/profile' className='text-sm text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark'>Profile</Link>
        </>}
        <button onClick={toggle} className='text-muted-light dark:text-muted-dark'>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        {user
          ? <button onClick={handleLogout} className='text-muted-light dark:text-muted-dark'><LogOut size={16} /></button>
          : <Link to='/login' className='text-sm bg-accent-light dark:bg-accent-dark text-white dark:text-bg-dark px-4 py-1.5 rounded-md font-medium'>Login</Link>
        }
      </div>
    </nav>
  )
}