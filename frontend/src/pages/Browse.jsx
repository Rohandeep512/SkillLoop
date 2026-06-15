import { useEffect, useState } from 'react'
import api from '../api/axios'
import SkillCard from '../components/ui/SkillCard'

export default function Browse() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/users').then(r => setUsers(r.data)).catch(console.error)
  }, [])

  const filtered = users.filter(u =>
    u.skillsOffered.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
    u.skillsWanted.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className='text-3xl font-semibold tracking-tight mb-1'>Browse Skills</h1>
      <p className='text-sm text-muted-light dark:text-muted-dark mb-6'>Find someone to exchange skills with</p>
      <input className='input max-w-sm mb-8' placeholder='Search by skill or name...' value={search} onChange={e => setSearch(e.target.value)} />
      <div className='flex flex-col gap-4'>
        {filtered.map(u => <SkillCard key={u._id} user={u} />)}
      </div>
    </div>
  )
}