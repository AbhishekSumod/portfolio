import TextType from './TextType'
import profileVideo from '../assets/MicrosoftTeams-video.mp4'

function HeroSection() {
  const name = 'Abhishek Sumod'

  return (
    <section className="hero" id="home">
      <div className="hero__left hero__intro">
        <span className="hero__eyebrow">Full-Stack Developer</span>
        <h1 className="hero__name" aria-label={name}>
          {name.split('').map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="hero__letter"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p className="hero__role">
          <TextType
            as="span"
            text="Software Developer"
            typingSpeed={85}
            initialDelay={900}
            loop={false}
            showCursor={false}
          />
        </p>
        <p className="hero__summary">
          I build fast, scalable, and polished web experiences with modern frontend and robust backend
          architecture.
        </p>
        <div className="hero__social-inline" aria-label="Social links">
          <a href="https://github.com/AbhishekSumod" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/abhisheksumod/" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
        </div>
        <div className="hero__actions">
          <a href="#skills" className="btn hero__link">
            Explore Skills
          </a>
          <a href="#projects" className="btn btn--ghost hero__link">
            View Projects
          </a>
        </div>
        <a className="scroll-cue" href="#skills" aria-label="Scroll to skills">
          Scroll Down
        </a>
      </div>

      <div className="hero__right hero__intro hero__intro--delay">
        <div className="profile-frame">
          {/* Place your profile video here */}
          <video className="profile-video" src={profileVideo} autoPlay muted loop playsInline preload="metadata" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
