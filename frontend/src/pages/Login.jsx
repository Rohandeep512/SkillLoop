import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', form)
      login(data.user, data.token)
      navigate('/browse')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl shadow-black/5'>
      <h1 className='text-4xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white'>Welcome back</h1>
      <p className='text-gray-600 dark:text-gray-400 mb-8'>Log in to your SkillLoop account</p>
      
      {error && <p className='text-red-500 text-sm mb-4 font-bold'>{error}</p>}
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input className='w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-green-500' type='email' placeholder='Email' value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className='w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-green-500' type='password' placeholder='Password' value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/20 transition-all' type='submit'>Log in</button>
      </form>
      
      <p className='text-gray-600 dark:text-gray-400 mt-6 text-center'>
        No account? <Link to='/register' className='text-green-500 font-bold hover:underline'>Register</Link>
      </p>
    </div>
  )
}