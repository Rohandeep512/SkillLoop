import { useEffect, useState } from 'react'
import api from '../api/axios'
import SkillTag from '../components/ui/SkillTag'
import { X, User, Edit3, Save, Plus } from 'lucide-react'

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

  if (!user) return <div className='animate-pulse text-gray-500'>Loading profile...</div>

  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      {/* Header Section */}
      <div className='flex items-start justify-between mb-10'>
        <div className='flex items-center gap-6'>
          <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl font-black text-gray-400">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className='text-4xl font-black tracking-tighter text-gray-900 dark:text-white'>{user.name}</h1>
            <p className='text-gray-500 font-medium'>{user.email}</p>
          </div>
        </div>
        <button 
          onClick={() => editing ? save() : setEditing(true)} 
          className='flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold hover:opacity-90 transition-all'
        >
          {editing ? <><Save size={18}/> Save Changes</> : <><Edit3 size={18}/> Edit Profile</>}
        </button>
      </div>

      {/* Bio Section */}
      <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 mb-8'>
        <p className='text-xs font-black uppercase tracking-widest text-gray-400 mb-4'>Bio</p>
        {editing ? (
          <textarea className='w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border-0 focus:ring-2 focus:ring-green-500 outline-none text-gray-900 dark:text-white' rows={3} value={form.bio || ''} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} />
        ) : (
          <p className='text-lg text-gray-700 dark:text-gray-300'>{user.bio || 'No bio yet — tell the community what you love to learn!'}</p>
        )}
      </div>

      {/* Skills Grid */}
      <div className='grid md:grid-cols-2 gap-8 mb-12'>
        {[['offered', 'Skills I Teach', 'green'], ['wanted', 'Skills I Want', 'default']].map(([type, label, variant]) => (
          <div key={type} className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8'>
            <p className='text-xs font-black uppercase tracking-widest text-gray-400 mb-6'>{label}</p>
            <div className='flex flex-wrap gap-2 mb-6'>
              {(form[type === 'offered' ? 'skillsOffered' : 'skillsWanted'] || []).map(s => (
                <div key={s} className='flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full'>
                  <SkillTag label={s} variant={variant} />
                  {editing && <button onClick={() => removeSkill(type, s)} className='ml-1 text-gray-400 hover:text-red-500'><X size={14} /></button>}
                </div>
              ))}
            </div>
            {editing && (
              <div className='flex gap-2'>
                <input className='flex-1 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full text-sm outline-none border border-gray-200 dark:border-gray-700' placeholder='Add a skill...' value={skillInput[type]} onChange={e => setSkillInput(p => ({ ...p, [type]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && addSkill(type)} />
                <button onClick={() => addSkill(type)} className='bg-green-500 text-white p-2 rounded-full'><Plus size={20} /></button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reputation Footer */}
      <div className='bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex items-center justify-between'>
        <div>
          <p className='text-2xl font-semibold'>{user.reputation.toFixed(1)}<span className='text-sm text-muted-light dark:text-muted-dark font-normal'>/5</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-500">Based on {user.ratingsCount} ratings</p>
        </div>
      </div>
    </div>
  )
}