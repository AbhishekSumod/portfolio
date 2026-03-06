import { useState } from 'react'
import HeroSection from './components/HeroSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ProjectModal from './components/ProjectModal'
import Prism from './components/Prism'
import DotGrid from './components/DotGrid'
import { projects, skills } from './data/portfolioData'

function App() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <div className="app-shell">
      <div className="page-dot-grid" aria-hidden="true">
        <DotGrid
          dotSize={4}
          gap={24}
          baseColor="#18181b"
          activeColor="#9ca3af"
          proximity={170}
          speedTrigger={850}
          shockRadius={240}
          shockStrength={0.5}
          returnDuration={0.9}
        />
      </div>
      <div className="page-prism" aria-hidden="true">
        <Prism animationType="3drotate" glow={1.05} noise={0.12} bloom={1.05} timeScale={0.4} />
      </div>
      <div className="ambient ambient--a" aria-hidden="true" />
      <div className="ambient ambient--b" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="background-glow" aria-hidden="true" />
      <div className="abstract-layer" aria-hidden="true">
        <span className="abstract-orb abstract-orb--one" />
        <span className="abstract-orb abstract-orb--two" />
        <span className="abstract-orb abstract-orb--three" />
        <span className="abstract-line abstract-line--one" />
        <span className="abstract-line abstract-line--two" />
      </div>
      <main className="portfolio">
        <HeroSection />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} onSelectProject={setActiveProject} />
      </main>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}

export default App



