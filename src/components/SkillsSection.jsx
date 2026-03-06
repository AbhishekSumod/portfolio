import { useReveal } from '../hooks/useReveal'
import { FaGitAlt, FaJava, FaReact } from 'react-icons/fa'
import { SiFlutter, SiJavascript, SiMongodb, SiPython, SiSpringboot } from 'react-icons/si'

const skillIcons = {
  react: { Icon: FaReact, color: '#61DBFB' },
  mongodb: { Icon: SiMongodb, color: '#47A248' },
  java: { Icon: FaJava, color: '#f89820' },
  springboot: { Icon: SiSpringboot, color: '#6DB33F' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  git: { Icon: FaGitAlt, color: '#F05032' },
  flutter: { Icon: SiFlutter, color: '#54C5F8' },
  python: { Icon: SiPython, color: '#3776AB' },
}

function SkillsSection({ skills }) {
  const { ref, isVisible } = useReveal(0.18)

  return (
    <section className={`section section--skills ${isVisible ? 'section--skills-visible' : ''}`} id="skills" ref={ref} data-label="Skills">
      <div className="section__head">
        <h2 className="section__title">Skills</h2>
        <p className="section__subtitle">Technologies I use to design, build, and ship production-ready apps.</p>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const iconData = skillIcons[skill.iconKey]
          const Icon = iconData?.Icon
          return (
            <article
              key={skill.name}
              className={`skill-card ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="skill-icon" aria-hidden="true">
                {Icon ? <Icon style={{ color: iconData.color }} /> : skill.name.slice(0, 2)}
              </div>
              <h3>{skill.name}</h3>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default SkillsSection
