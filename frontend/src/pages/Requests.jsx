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

  const sections = [
    { label: 'Incoming Requests', list: requests.filter(r => r.status === 'pending' && r.receiver._id === user.id), icon: Inbox },
    { label: 'Active Matches', list: requests.filter(r => r.status === 'accepted'), icon: CheckCircle2 },
    { label: 'Sent Requests', list: requests.filter(r => r.status === 'pending' && r.sender._id === user.id), icon: Send }
  ]

  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      <h1 className='text-4xl font-black tracking-tighter mb-10 text-gray-900 dark:text-white'>Barter Requests</h1>
      
      {sections.map(({ label, list, icon: Icon }) => (
        <div key={label} className='mb-12'>
          <div className="flex items-center gap-2 mb-6">
            <Icon className="text-green-500" size={20} />
            <p className='text-xs font-black uppercase tracking-widest text-gray-500'>{label}</p>
          </div>
          
          {list.length === 0 ? (
            <div className='bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 text-center border-dashed'>
              <p className='text-sm text-gray-500 italic'>Nothing here yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {list.map(r => <BarterRequestCard key={r._id} request={r} onUpdate={load} />)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}