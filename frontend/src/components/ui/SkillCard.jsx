import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import SkillTag from './SkillTag'
import { Sparkles } from 'lucide-react'

export default function SkillCard({ user }) {
  const { user: me } = useAuth()
  const navigate = useNavigate()
  const [aiNote, setAiNote] = useState('')
  const [loading, setLoading] = useState(false)

 const sendRequest = async () => {
  if (!me) return navigate('/login')
  try {
    const { data: myProfile } = await api.get('/users/me')
    await api.post('/barter', {
      receiver: user._id,
      skillOffered: myProfile.skillsOffered?.[0] || 'General',
      skillWanted: user.skillsOffered?.[0] || 'General',
    })
    alert('Request sent!')
  } catch (err) {
    alert(err.response?.data?.message || 'Could not send request')
  }
}
  const fetchAI = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/users/ai-match/${user._id}`)
      setAiNote(data.explanation)
    } catch { setAiNote('Could not load explanation') }
    setLoading(false)
  }

  return (
    <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-5'>
      <div className='flex justify-between items-start mb-3'>
        <div>
          <p className='font-medium text-base'>{user.name}</p>
          <p className='text-xs text-muted-light dark:text-muted-dark mt-0.5'>{user.bio || 'No bio yet'}</p>
        </div>
        <div className='flex gap-2'>
          <button onClick={fetchAI} className='btn-ghost flex items-center gap-1 text-xs py-1.5'>
            <Sparkles size={12} />{loading ? '...' : 'AI Match'}
          </button>
          <button onClick={sendRequest} className='btn-primary text-xs py-1.5'>Request</button>
        </div>
      </div>
      <div className='flex flex-wrap gap-2 mb-2'>
        {user.skillsOffered?.map(s => <SkillTag key={s} label={`Teaches ${s}`} variant='green' />)}
        {user.skillsWanted?.map(s => <SkillTag key={s} label={`Wants ${s}`} />)}
      </div>
      {aiNote && <p className='text-xs text-muted-light dark:text-muted-dark mt-3 border-l-2 border-accent-light dark:border-accent-dark pl-3'>{aiNote}</p>}
    </div>
  )
}