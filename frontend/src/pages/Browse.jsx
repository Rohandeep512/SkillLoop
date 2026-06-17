import { useEffect, useState } from 'react'
import api from '../api/axios'
import SkillCard from '../components/ui/SkillCard'
import { Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Browse() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('') // Separate state for button trigger
  const { user: me } = useAuth()
  useEffect(() => {
    api.get('/users').then(r => setUsers(r.data)).catch(console.error)
  }, [])

  // Filter based on the 'query' state (which only updates on button click)
  

const filtered = users
  .filter(u =>
    u.skillsOffered.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
    u.skillsWanted.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
    u.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    const aMatch = me?.skillsOffered?.some(s => a.skillsWanted.includes(s)) && me?.skillsWanted?.some(s => a.skillsOffered.includes(s))
    const bMatch = me?.skillsOffered?.some(s => b.skillsWanted.includes(s)) && me?.skillsWanted?.some(s => b.skillsOffered.includes(s))
    return bMatch - aMatch
  })

  return (
    /* Main Container with the same Bento Box aesthetic */
    <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-10 transition-all duration-300 hover:border-green-500/30 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-green-500/5'>
      
      {/* Larger Header */}
      <h1 className='text-4xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white'>Browse Skills</h1>
      <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>Find someone to exchange skills with.</p>
      
      {/* Larger, premium search bar with integrated button */}
      <div className='relative mb-10'>
        <Search className='absolute left-4 top-4 text-gray-400' size={22} />
        <input 
          className='w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-32 text-lg outline-none focus:border-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all focus:shadow-lg focus:shadow-green-500/10' 
          placeholder='Search by skill or name...' 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && setQuery(search)}
        />
        <button 
          onClick={() => setQuery(search)}
          className='absolute right-2 top-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all'
        >
          Search
        </button>
      </div>

      {/* List container */}
      <div className='flex flex-col gap-6'>
        {filtered.map(u => (
          <div key={u._id} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
             <SkillCard user={u} />
          </div>
        ))}
      </div>
    </div>
  )
}