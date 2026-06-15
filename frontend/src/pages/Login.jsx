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
    <div className='max-w-md mx-auto mt-20'>
      <h1 className='text-3xl font-semibold tracking-tight mb-1'>Welcome back</h1>
      <p className='text-sm text-muted-light dark:text-muted-dark mb-8'>Log in to your SkillLoop account</p>
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input className='input' type='email' placeholder='Email' value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className='input' type='password' placeholder='Password' value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button className='btn-primary' type='submit'>Log in</button>
      </form>
      <p className='text-sm text-muted-light dark:text-muted-dark mt-6'>No account? <Link to='/register' className='text-accent-light dark:text-accent-dark'>Register</Link></p>
    </div>
  )
}