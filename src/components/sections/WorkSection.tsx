import { projects } from '@/lib/projects'
import { WorkGrid } from './WorkGrid'

export function WorkSection() {
  return (
    <section className="section" id="work" data-screen-label="02 Work">
      <WorkGrid projects={projects} />
    </section>
  )
}
