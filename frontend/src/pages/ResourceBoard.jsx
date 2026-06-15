import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import ResourceCard from '../components/ui/ResourceCard'

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
    <div className='max-w-2xl'>
      <h1 className='text-3xl font-semibold tracking-tight mb-1'>Resource Board</h1>
      <p className='text-sm text-muted-light dark:text-muted-dark mb-8'>Shared learning resources for this match</p>
      <div className='grid grid-cols-2 gap-3 mb-4'>
        <input className='input' placeholder='Title' value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} />
        <input className='input' placeholder='Skill tag e.g. React' value={form.skillTag} onChange={e => setForm(p => ({...p, skillTag: e.target.value}))} />
        <input className='input col-span-2' placeholder='URL' value={form.url} onChange={e => setForm(p => ({...p, url: e.target.value}))} />
        <input className='input col-span-2' placeholder='Description (optional)' value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} />
      </div>
      <button className='btn-primary mb-8' onClick={submit}>Add Resource</button>
      <div className='flex flex-col gap-3'>
        {resources.map(r => <ResourceCard key={r._id} resource={r} />)}
      </div>
    </div>
  )
}