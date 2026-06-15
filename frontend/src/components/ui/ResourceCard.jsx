import SkillTag from './SkillTag'
import { ExternalLink } from 'lucide-react'

export default function ResourceCard({ resource }) {
  return (
    <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4'>
      <div className='flex justify-between items-start mb-1'>
        <p className='font-medium text-sm'>{resource.title}</p>
        <a href={resource.url} target='_blank' rel='noreferrer' className='text-muted-light dark:text-muted-dark hover:text-accent-light dark:hover:text-accent-dark'>
          <ExternalLink size={14} />
        </a>
      </div>
      {resource.description && <p className='text-xs text-muted-light dark:text-muted-dark mb-2'>{resource.description}</p>}
      <SkillTag label={resource.skillTag} variant='green' />
    </div>
  )
}