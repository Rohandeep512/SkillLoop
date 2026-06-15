import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useState } from 'react'

const LoopIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 12a5 5 0 0 0-10 0c0 2.76 2.24 5 5 5h6"/>
    <path d="M16 14l2-2-2-2"/>
  </svg>
)

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/'); setOpen(false) }

  const links = [
    { to: '/browse', label: 'Browse' },
    ...(user ? [
      { to: '/loops', label: 'Loops' },
      { to: '/roadmap', label: 'Roadmap' },
      { to: '/requests', label: 'Requests' },
      { to: '/profile', label: 'Profile' },
    ] : [])
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className='sticky top-0 z-50 border-b border-border-light dark:border-border-dark bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md px-6 py-4'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <Link to='/' className='flex items-center gap-2 text-base font-semibold tracking-tight'>
          <span className='text-accent-light dark:text-accent-dark'><LoopIcon /></span>
          SkillLoop
        </Link>

        {/* Desktop */}
        <div className='hidden md:flex items-center gap-6'>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={`relative text-sm transition-colors ${isActive(to) ? 'text-primary-light dark:text-primary-dark' : 'text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark'}`}>
              {label}
              {isActive(to) && <span className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-light dark:bg-accent-dark' />}
            </Link>
          ))}
          <button onClick={toggle} className='text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors'>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {user
            ? <button onClick={handleLogout} className='text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors'><LogOut size={16} /></button>
            : <Link to='/login' className='btn-primary text-sm'>Login</Link>
          }
        </div>

        {/* Mobile burger */}
        <button className='md:hidden text-muted-light dark:text-muted-dark' onClick={() => setOpen(p => !p)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className='md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border-light dark:border-border-dark pt-4'>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} className={`text-sm ${isActive(to) ? 'text-accent-light dark:text-accent-dark' : 'text-muted-light dark:text-muted-dark'}`}>{label}</Link>
          ))}
          <div className='flex gap-4 items-center'>
            <button onClick={toggle} className='text-muted-light dark:text-muted-dark'>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
            {user
              ? <button onClick={handleLogout} className='text-sm text-muted-light dark:text-muted-dark'>Logout</button>
              : <Link to='/login' onClick={() => setOpen(false)} className='btn-primary text-sm'>Login</Link>
            }
          </div>
        </div>
      )}
    </nav>
  )
}