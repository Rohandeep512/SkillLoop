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

  // Filter out self-requests (sender === receiver) that may exist in DB
  const valid = requests.filter(r => r.sender._id !== r.receiver._id)

  // Active matches: accepted, deduplicated by user pair
  const seenActive = new Set()
  const active = valid.filter(r => {
    if (r.status !== 'accepted') return false
    const key = [r.sender._id, r.receiver._id].sort().join('-')
    if (seenActive.has(key)) return false
    seenActive.add(key)
    return true
  })

  // Incoming: pending requests where I am the receiver, deduplicated per sender
  const seenIncoming = new Set()
  const incoming = valid.filter(r => {
    if (r.status !== 'pending' || r.receiver._id !== user.id) return false
    if (seenIncoming.has(r.sender._id)) return false
    seenIncoming.add(r.sender._id)
    return true
  })

  // Sent: pending requests where I am the sender, deduplicated per receiver
  const seenSent = new Set()
  const sent = valid.filter(r => {
    if (r.status !== 'pending' || r.sender._id !== user.id) return false
    if (seenSent.has(r.receiver._id)) return false
    seenSent.add(r.receiver._id)
    return true
  })

  const sections = [
    { label: 'Incoming Requests', list: incoming, icon: Inbox },
    { label: 'Active Matches', list: active, icon: CheckCircle2 },
    { label: 'Sent Requests', list: sent, icon: Send }
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