import { useReveal } from '../hooks/useReveal'

function ProjectsSection({ projects, onSelectProject }) {
  const { ref, isVisible } = useReveal(0.14)

  return (
    <section className="section section--projects" id="projects" ref={ref} data-label="Projects">
      <div className="section__head">
        <h2 className="section__title">Projects</h2>
        <p className="section__subtitle">Selected work focused on usability, performance, and clean architecture.</p>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => {
          const isQreatProject = project.title.toLowerCase().includes('qreat')
          return (
            <article
              key={project.id}
              className={`card project-card project-card--${index === 0 ? 'featured' : 'standard'} ${isQreatProject ? 'project-card--side-media' : ''} ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onClick={() => onSelectProject(project)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  onSelectProject(project)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open details for ${project.title}`}
            >
              <span className="project-card__halo" aria-hidden="true" />
              {project.coverImage && (
                <div className="project-card__media" aria-hidden="true">
                  <img src={project.coverImage} alt="" loading="lazy" />
                </div>
              )}
              <div className="project-card__body">
                <div className="project-card__meta">
                  <span className="project-card__index">{`${String(index + 1).padStart(2, '0')}`}</span>
                  <span className="project-card__tag">Build</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
              </div>

              <div className="project-card__actions">
                <button
                  className="btn"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    onSelectProject(project)
                  }}
                >
                  View Details <span aria-hidden="true">-&gt;</span>
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ProjectsSection
