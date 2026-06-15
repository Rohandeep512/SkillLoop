import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import ResourceCard from '../components/ui/ResourceCard'
import { Link2, Plus } from 'lucide-react'

export default function ResourceBoard() {
  const { matchId } = useParams()
  const [resources, setResources] = useState([])
  const [form, setForm] = useState({ title: '', url: '', description: '', skillTag: '' })

  const load = () => api.get(`/resources/${matchId}`).then(r => setResources(r.data))
  useEffect(() => { load() }, [])

  const submit = async () => {
    await api.post('/resources', { ...form, matchId })
    setForm({ title: '', url: '', description: '', skillTag: '' })
    load()
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      <h1 className='text-4xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white'>Resource Board</h1>
      <p className='text-lg text-gray-600 dark:text-gray-400 mb-10'>Shared learning materials for this match.</p>
      
      <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <input className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none' placeholder='Resource Title' value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} />
          <input className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none' placeholder='Skill Tag (e.g. React)' value={form.skillTag} onChange={e => setForm(p => ({...p, skillTag: e.target.value}))} />
          <input className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none md:col-span-2' placeholder='URL' value={form.url} onChange={e => setForm(p => ({...p, url: e.target.value}))} />
          <input className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 outline-none md:col-span-2' placeholder='Description' value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} />
        </div>
        <button className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold w-full md:w-auto' onClick={submit}>
          <Plus size={20} /> Add Resource
        </button>
      </div>

      <div className='space-y-4'>
        {resources.map(r => <ResourceCard key={r._id} resource={r} />)}
      </div>
    </div>
  )
}