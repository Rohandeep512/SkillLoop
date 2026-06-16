import { useEffect, useState } from 'react'
import api from '../api/axios'
import BarterRequestCard from '../components/ui/BarterRequestCard'
import { useAuth } from '../context/AuthContext'
import { Inbox, CheckCircle2, Send } from 'lucide-react'

export default function Requests() {
  const [requests, setRequests] = useState([])
  const { user } = useAuth()

  const load = () => api.get('/barter/mine').then(r => setRequests(r.data))
  useEffect(() => { load() }, [])

  const seen = new Set()
  const active = requests.filter(r => {
    if (r.status !== 'accepted') return false
    const key = [r.sender._id, r.receiver._id].sort().join('-')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const sections = [
    { label: 'Incoming Requests', list: requests.filter(r => r.status === 'pending' && r.receiver._id === user.id), icon: Inbox },
    { label: 'Active Matches', list: active, icon: CheckCircle2 },
    { label: 'Sent Requests', list: requests.filter(r => r.status === 'pending' && r.sender._id === user.id), icon: Send }
  ]

  return (
    <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-10 transition-all duration-300'>
      
      {/* Header aligned with Browse.jsx */}
      <h1 className='text-4xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white'>Barter Requests</h1>
      <p className='text-lg text-gray-600 dark:text-gray-400 mb-10'>Manage your exchanges and active matches.</p>
      
      {sections.map(({ label, list, icon: Icon }) => (
        <div key={label} className='mb-12 last:mb-0'>
          {/* Section Label with icon */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Icon className="text-green-500" size={20} />
            </div>
            <p className='text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400'>{label}</p>
          </div>
          
          {list.length === 0 ? (
            <div className='bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center border-dashed'>
              <p className='text-gray-500 dark:text-gray-400 italic'>Nothing here yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {list.map(r => (
                <div key={r._id} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                   <BarterRequestCard request={r} onUpdate={load} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}