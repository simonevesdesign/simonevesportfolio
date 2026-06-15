import { getProjects } from '@/lib/payload'
import { WorkGrid } from './WorkGrid'

export async function WorkSection() {
  const projects = await getProjects()
  return (
    <section className="section" id="work" data-screen-label="02 Work">
      <WorkGrid projects={projects} />
    </section>
  )
}
