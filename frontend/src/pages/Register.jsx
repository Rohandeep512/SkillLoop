import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/register', form)
      login(data.user, data.token)
      navigate('/browse')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl shadow-black/5'>
      <h1 className='text-4xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white'>Create account</h1>
      <p className='text-gray-600 dark:text-gray-400 mb-8'>Start exchanging skills today</p>
      
      {error && <p className='text-red-500 text-sm mb-4 font-bold'>{error}</p>}
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input className='w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-green-500' placeholder='Name' value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input className='w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-green-500' type='email' placeholder='Email' value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <div className="relative">
          <input className='w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 pr-12 outline-none focus:ring-2 focus:ring-green-500' type={showPassword ? 'text' : 'password'} placeholder='Password' value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/20 transition-all' type='submit'>Create account</button>
      </form>
      
      <p className='text-gray-600 dark:text-gray-400 mt-6 text-center'>
        Have an account? <Link to='/login' className='text-green-500 font-bold hover:underline'>Log in</Link>
      </p>
    </div>
  )
}