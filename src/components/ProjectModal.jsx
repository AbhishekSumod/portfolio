import { useEffect } from 'react'

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = 'auto'
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal__header">
          <h3>{project.title}</h3>
          <button className="btn btn--ghost modal__close" type="button" onClick={onClose} aria-label="Close modal">
            Close
          </button>
        </div>

        <div className="modal__section">
          <h4>Overview</h4>
          <p>{project.fullDescription}</p>
        </div>

        {Array.isArray(project.keyFeatures) && project.keyFeatures.length > 0 && (
          <div className="modal__section">
            <h4>Key Features</h4>
            <ul className="modal__list">
              {project.keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="modal__section">
          <h4>Tech Stack</h4>
          <div className="tag-list">
            {project.techStack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="modal__actions">
          <a className="modal__link btn" href={project.github} target="_blank" rel="noreferrer noopener">
            GitHub Link
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
