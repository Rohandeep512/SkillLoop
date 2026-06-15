import { useEffect, useState } from 'react'
import api from '../api/axios'
import SkillTag from '../components/ui/SkillTag'
import { X } from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [skillInput, setSkillInput] = useState({ offered: '', wanted: '' })

  useEffect(() => {
    api.get('/users/me').then(r => { setUser(r.data); setForm(r.data) })
  }, [])

  const save = async () => {
    const { data } = await api.put('/users/me', form)
    setUser(data); setEditing(false)
  }

  const addSkill = (type) => {
    const key = type === 'offered' ? 'skillsOffered' : 'skillsWanted'
    const val = skillInput[type].trim()
    if (!val) return
    setForm(p => ({ ...p, [key]: [...(p[key] || []), val] }))
    setSkillInput(p => ({ ...p, [type]: '' }))
  }

  const removeSkill = (type, skill) => {
    const key = type === 'offered' ? 'skillsOffered' : 'skillsWanted'
    setForm(p => ({ ...p, [key]: p[key].filter(s => s !== skill) }))
  }

  if (!user) return <p className='text-muted-light dark:text-muted-dark'>Loading...</p>

  return (
    <div className='max-w-2xl'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-semibold tracking-tight'>{user.name}</h1>
          <p className='text-sm text-muted-light dark:text-muted-dark mt-1'>{user.email}</p>
        </div>
        <button onClick={() => editing ? save() : setEditing(true)} className='btn-primary'>
          {editing ? 'Save' : 'Edit Profile'}
        </button>
      </div>

      {editing ? (
        <textarea className='input mb-6 resize-none' rows={3} placeholder='Bio' value={form.bio || ''} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} />
      ) : (
        <p className='text-sm text-muted-light dark:text-muted-dark mb-6'>{user.bio || 'No bio yet'}</p>
      )}

      <div className='grid grid-cols-2 gap-8'>
        {[['offered', 'Skills I Teach'], ['wanted', 'Skills I Want']].map(([type, label]) => (
          <div key={type}>
            <p className='text-xs font-medium uppercase tracking-widest text-muted-light dark:text-muted-dark mb-3'>{label}</p>
            <div className='flex flex-wrap gap-2 mb-3'>
              {(form[type === 'offered' ? 'skillsOffered' : 'skillsWanted'] || []).map(s => (
                <span key={s} className='flex items-center gap-1'>
                  <SkillTag label={s} variant={type === 'offered' ? 'green' : 'default'} />
                  {editing && <button onClick={() => removeSkill(type, s)}><X size={10} /></button>}
                </span>
              ))}
            </div>
            {editing && (
              <div className='flex gap-2'>
                <input className='input text-xs py-1.5' placeholder='Add skill' value={skillInput[type]} onChange={e => setSkillInput(p => ({ ...p, [type]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && addSkill(type)} />
                <button onClick={() => addSkill(type)} className='btn-ghost text-xs py-1.5'>Add</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='mt-8 pt-8 border-t border-border-light dark:border-border-dark'>
        <p className='text-xs font-medium uppercase tracking-widest text-muted-light dark:text-muted-dark mb-1'>Reputation</p>
        <p className='text-2xl font-semibold'>{user.reputation} <span className='text-sm text-muted-light dark:text-muted-dark font-normal'>/ {user.ratingsCount} ratings</span></p>
      </div>
    </div>
  )
}