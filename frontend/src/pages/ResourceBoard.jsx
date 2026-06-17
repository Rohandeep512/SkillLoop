import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import ResourceCard from '../components/ui/ResourceCard'
import { Plus, Mail, Copy, CheckCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function ResourceBoard() {
  const { matchId } = useParams()
  const { user } = useAuth()
  const [resources, setResources] = useState([])
  const [form, setForm] = useState({ title: '', url: '', description: '', skillTag: '' })
  const [contact, setContact] = useState(null)
  const [contactLoading, setContactLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const load = () => api.get(`/resources/${matchId}`).then(r => setResources(r.data))

  useEffect(() => { load() }, [])

  const submit = async () => {
    if (!form.title || !form.url || !form.skillTag) return alert('Title, URL and Skill Tag are required')
    await api.post('/resources', { ...form, matchId })
    setForm({ title: '', url: '', description: '', skillTag: '' })
    load()
  }

  const handleDelete = (id) => setResources(p => p.filter(r => r._id !== id))

  const shareEmail = async () => {
    if (contact) return // already fetched
    setContactLoading(true)
    try {
      const { data } = await api.get(`/barter/${matchId}/other-user`)
      setContact(data)
    } catch {
      alert('Could not fetch contact info. Make sure this match is accepted.')
    }
    setContactLoading(false)
  }

  const copyEmail = () => {
    if (!contact?.email) return
    navigator.clipboard.writeText(contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      <div className='flex justify-between items-start mb-8'>
        <div>
          <h1 className='text-4xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white'>Resource Board</h1>
          <p className='text-lg text-gray-600 dark:text-gray-400'>Shared learning materials for this match.</p>
        </div>

        {/* Contact Email Section */}
        {!contact ? (
          <button
            onClick={shareEmail}
            disabled={contactLoading}
            className='flex items-center gap-2 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all'
          >
            <Mail size={15} className="text-green-500" />
            {contactLoading ? 'Loading...' : 'Get Contact Email'}
          </button>
        ) : (
          <div className='bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-2xl px-5 py-3'>
            <p className='text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-400 mb-1'>{contact.name}'s Email</p>
            <div className='flex items-center gap-2'>
              <a href={`mailto:${contact.email}`} className='text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors'>
                {contact.email}
              </a>
              <button
                onClick={copyEmail}
                className='text-gray-400 hover:text-green-500 transition-colors'
                title='Copy email'
              >
                {copied ? <CheckCheck size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <input className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none focus:border-green-500 transition-colors text-gray-900 dark:text-white' placeholder='Resource Title' value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} />
          <input className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none focus:border-green-500 transition-colors text-gray-900 dark:text-white' placeholder='Skill Tag (e.g. React)' value={form.skillTag} onChange={e => setForm(p => ({...p, skillTag: e.target.value}))} />
          <input className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none focus:border-green-500 transition-colors text-gray-900 dark:text-white md:col-span-2' placeholder='URL' value={form.url} onChange={e => setForm(p => ({...p, url: e.target.value}))} />
          <input className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none focus:border-green-500 transition-colors text-gray-900 dark:text-white md:col-span-2' placeholder='Description (optional)' value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} />
        </div>
        <button className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-bold transition-colors' onClick={submit}>
          <Plus size={18} /> Add Resource
        </button>
      </div>

      <div className='space-y-4'>
        {resources.length === 0
          ? <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-8'>No resources yet. Add the first one.</p>
          : resources.map(r => <ResourceCard key={r._id} resource={r} onDelete={handleDelete} />)
        }
      </div>
    </div>
  )
}