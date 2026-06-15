import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
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
    <div className='max-w-md mx-auto mt-20'>
      <h1 className='text-3xl font-semibold tracking-tight mb-1'>Create account</h1>
      <p className='text-sm text-muted-light dark:text-muted-dark mb-8'>Start exchanging skills today</p>
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input className='input' placeholder='Name' value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input className='input' type='email' placeholder='Email' value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className='input' type='password' placeholder='Password' value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button className='btn-primary' type='submit'>Create account</button>
      </form>
      <p className='text-sm text-muted-light dark:text-muted-dark mt-6'>Have an account? <Link to='/login' className='text-accent-light dark:text-accent-dark'>Log in</Link></p>
    </div>
  )
}