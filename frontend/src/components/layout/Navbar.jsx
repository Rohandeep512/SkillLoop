import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useState } from 'react'

const LoopIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="6" cy="19" r="3"/>
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>
    <circle cx="18" cy="5" r="3"/>
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
    <nav className='sticky top-0 z-50 border-b border-slate-200 dark:border-gray-800 bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-xl px-6 py-4 transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        
        {/* Brand Logo */}
        <Link to='/' className='flex items-center gap-2 font-black tracking-tighter hover:opacity-80 transition-opacity'>
          <span className='text-green-500 dark:text-green-400'>
            <LoopIcon />
          </span>
          <span className='text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700 dark:from-green-400 dark:to-emerald-300'>
            SkillLoop
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-2'>
          <div className="flex items-center gap-1 mr-4 border-r border-slate-200 dark:border-gray-800 pr-6">
            {links.map(({ to, label }) => (
              <Link 
                key={to} 
                to={to} 
                className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive(to) 
                    ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' 
                    : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <button 
            onClick={toggle} 
            className='p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors'
            aria-label="Toggle Theme"
          >
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          {user ? (
            <button 
              onClick={handleLogout} 
              className='p-2.5 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors ml-1'
              title="Logout"
            >
              <LogOut size={22} />
            </button>
          ) : (
            <Link 
              to='/login' 
              className='ml-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-md shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all duration-300'
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Burger Menu Button */}
        <button 
          className='md:hidden p-2 rounded-full text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors' 
          onClick={() => setOpen(p => !p)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className='md:hidden mt-4 pb-4 flex flex-col gap-2 border-t border-slate-200 dark:border-gray-800 pt-4 animate-in slide-in-from-top-4 duration-300'>
          {links.map(({ to, label }) => (
            <Link 
              key={to} 
              to={to} 
              onClick={() => setOpen(false)} 
              className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                isActive(to) 
                  ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' 
                  : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800'
              }`}
            >
              {label}
            </Link>
          ))}
          
          <div className='flex gap-4 items-center mt-2 px-4 pt-4 border-t border-slate-100 dark:border-gray-800/50'>
            <button 
              onClick={toggle} 
              className='flex items-center justify-center p-3 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 flex-1 font-bold'
            >
              {dark ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            {user ? (
              <button 
                onClick={handleLogout} 
                className='flex items-center justify-center p-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex-1 font-bold'
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            ) : (
              <Link 
                to='/login' 
                onClick={() => setOpen(false)} 
                className='flex items-center justify-center p-3 rounded-xl bg-green-500 text-white flex-1 font-bold shadow-md'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}