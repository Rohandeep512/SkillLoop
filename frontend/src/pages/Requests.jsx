import { useEffect, useState } from 'react'
import api from '../api/axios'
import BarterRequestCard from '../components/ui/BarterRequestCard'
import { useAuth } from '../context/AuthContext'

export default function Requests() {
  const [requests, setRequests] = useState([])
  const { user } = useAuth()

  const load = () => api.get('/barter/mine').then(r => setRequests(r.data))
  useEffect(() => { load() }, [])

  const incoming = requests.filter(r => r.status === 'pending' && r.receiver._id === user.id)
  const active = requests.filter(r => r.status === 'accepted')
  const sent = requests.filter(r => r.status === 'pending' && r.sender._id === user.id)

  return (
    <div className='max-w-2xl'>
      <h1 className='text-3xl font-semibold tracking-tight mb-8'>Requests</h1>
      {[['Incoming', incoming], ['Active Matches', active], ['Sent', sent]].map(([label, list]) => (
        <div key={label} className='mb-8'>
          <p className='text-xs font-medium uppercase tracking-widest text-muted-light dark:text-muted-dark mb-3'>{label}</p>
          {list.length === 0
            ? <p className='text-sm text-muted-light dark:text-muted-dark'>None</p>
            : list.map(r => <BarterRequestCard key={r._id} request={r} onUpdate={load} />)
          }
        </div>
      ))}
    </div>
  )
}