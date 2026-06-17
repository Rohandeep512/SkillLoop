import SkillTag from './SkillTag'
import { ExternalLink, Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import { useState } from 'react'

export default function ResourceCard({ resource, onDelete }) {
  const { user } = useAuth()
  const isOwner = resource.addedBy?._id === user?.id
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this resource? This cannot be undone.')) return
    setDeleting(true)
    try {
      await api.delete(`/resources/${resource._id}`)
      onDelete(resource._id)
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete resource')
      setDeleting(false)
    }
  }

  return (
    <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-green-500/30 transition-all duration-300'>
      <div className='flex justify-between items-start mb-1'>
        <div>
          <p className='font-bold text-sm text-gray-900 dark:text-white'>{resource.title}</p>
          <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>Added by {resource.addedBy?.name}</p>
        </div>
        <div className='flex items-center gap-2'>
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className='p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all'
              title='Delete resource'
            >
              <Trash2 size={14} />
            </button>
          )}
          <a href={resource.url} target='_blank' rel='noreferrer' className='p-1.5 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all'>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
      {resource.description && <p className='text-xs text-gray-500 dark:text-gray-400 mb-3 mt-1'>{resource.description}</p>}
      <SkillTag label={resource.skillTag} variant='green' />
    </div>
  )
}